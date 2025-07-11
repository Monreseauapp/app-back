import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common'
import { DatabaseService } from 'src/database/database.service'
import { UploadFileDto, FileResponseDto } from './dto/upload-file.dto'
import * as fs from 'fs'
import * as path from 'path'
import { Prisma } from 'generated/prisma'

// Définir un type pour la sélection des champs nécessaires
type FileSelect = Prisma.FileGetPayload<{
  select: {
    id: true
    filename: true
    originalName: true
    mimetype: true
    size: true
    url: true
    uploadedAt: true
    category: true
    description: true
    isPublic: true
  }
}>

@Injectable()
export class UploadService {
  constructor(private readonly database: DatabaseService) {}

  async uploadSingleFile(
    file: Express.Multer.File,
    uploadDto: UploadFileDto,
  ): Promise<FileResponseDto> {
    if (!file) {
      throw new BadRequestException('Aucun fichier fourni')
    }

    try {
      const fileUrl = `/uploads/${file.filename}`

      const savedFile = await this.database.file.create({
        data: {
          filename: file.filename,
          originalName: file.originalname,
          mimetype: file.mimetype,
          size: file.size,
          path: file.path,
          url: fileUrl,
          userId: uploadDto.userId,
          category: uploadDto.category,
          description: uploadDto.description,
          isPublic: uploadDto.isPublic || false,
        },
      })

      return this.mapToFileResponse(savedFile)
    } catch {
      const safeUploadsDir = path.resolve('./uploads')
      const resolvedFilePath = path.resolve(file.path)
      if (!resolvedFilePath.startsWith(safeUploadsDir)) {
        throw new BadRequestException('Chemin de fichier non valide')
      }
      if (fs.existsSync(resolvedFilePath)) {
        fs.unlinkSync(resolvedFilePath)
      }
      throw new BadRequestException('Erreur lors de la sauvegarde du fichier')
    }
  }

  async uploadMultipleFiles(
    files: Express.Multer.File[],
    uploadDto: UploadFileDto,
  ): Promise<FileResponseDto[]> {
    if (!files || files.length === 0) {
      throw new BadRequestException('Aucun fichier fourni')
    }

    const uploadedFiles: FileResponseDto[] = []
    const failedFiles: string[] = []

    for (const file of files) {
      try {
        const result = await this.uploadSingleFile(file, uploadDto)
        uploadedFiles.push(result)
      } catch (error) {
        failedFiles.push(file.originalname)
        console.error(
          "Erreur lors de l'upload du fichier %s:",
          file.originalname,

          error,
        )
      }
    }

    if (failedFiles.length > 0) {
      throw new BadRequestException(
        `Erreur lors de l'upload des fichiers: ${failedFiles.join(', ')}`,
      )
    }

    return uploadedFiles
  }

  async getFileById(id: string): Promise<FileResponseDto> {
    const file = await this.database.file.findUnique({
      where: { id },
    })

    if (!file) {
      throw new NotFoundException('Fichier non trouvé')
    }

    return this.mapToFileResponse(file)
  }

  async getUserFiles(userId: string): Promise<FileResponseDto[]> {
    const files = await this.database.file.findMany({
      where: { userId },
      orderBy: { uploadedAt: 'desc' },
    })

    return files.map((file) => this.mapToFileResponse(file))
  }

  async deleteFile(id: string): Promise<void> {
    const file = await this.database.file.findUnique({
      where: { id },
    })

    if (!file) {
      throw new NotFoundException('Fichier non trouvé')
    }

    if (fs.existsSync(file.path)) {
      fs.unlinkSync(file.path)
    }

    await this.database.file.delete({
      where: { id },
    })
  }

  async getFileStream(
    id: string,
  ): Promise<{ stream: fs.ReadStream; file: any }> {
    const file = await this.database.file.findUnique({
      where: { id },
    })

    if (!file) {
      throw new NotFoundException('Fichier non trouvé')
    }

    if (!fs.existsSync(file.path)) {
      throw new NotFoundException('Fichier physique non trouvé')
    }

    const stream = fs.createReadStream(file.path)
    return { stream, file }
  }

  private mapToFileResponse(file: FileSelect): FileResponseDto {
    return {
      id: file.id,
      filename: file.filename,
      originalName: file.originalName,
      mimetype: file.mimetype,
      size: file.size,
      url: file.url ?? '',
      uploadedAt: file.uploadedAt,
      category: file.category ?? undefined,
      description: file.description ?? undefined,
      isPublic: file.isPublic,
    }
  }

  static fileFilter(allowedTypes: string[]) {
    return (
      _req: any,
      file: Express.Multer.File,
      callback: (error: Error | null, acceptFile: boolean) => void,
    ) => {
      if (allowedTypes.some((type) => file.mimetype.includes(type))) {
        callback(null, true)
      } else {
        callback(
          new BadRequestException(
            `Type de fichier non autorisé. Types acceptés: ${allowedTypes.join(', ')}`,
          ),
          false,
        )
      }
    }
  }
}
