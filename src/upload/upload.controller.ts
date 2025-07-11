import {
  Controller,
  Post,
  Get,
  Delete,
  Param,
  Body,
  UseInterceptors,
  UploadedFile,
  UploadedFiles,
  ValidationPipe,
  Res,
  Query,
} from '@nestjs/common'
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express'
import { diskStorage } from 'multer'
import { extname } from 'path'
import { Response } from 'express'
import { Readable } from 'stream'
import { UploadService } from './upload.service'
import { UploadFileDto, FileResponseDto } from './dto/upload-file.dto'

interface FileStreamResponse {
  stream: Readable
  file: {
    mimetype: string
    originalName: string
    size: number
  }
}

const storage = diskStorage({
  destination: './uploads',
  filename: (req, file, callback) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9)
    const extension = extname(file.originalname)
    callback(null, `${file.fieldname}-${uniqueSuffix}${extension}`)
  },
})

type FileFilterCallback = (error: Error | null, acceptFile: boolean) => void

const imageFileFilter = (
  req: Express.Request,
  file: Express.Multer.File,
  callback: FileFilterCallback,
): void => {
  if (!file.originalname.match(/\.(jpg|jpeg|png|gif|webp)$/i)) {
    return callback(new Error('Seuls les fichiers image sont autorisés'), false)
  }
  callback(null, true)
}

const documentFileFilter = (
  req: Express.Request,
  file: Express.Multer.File,
  callback: FileFilterCallback,
): void => {
  if (!file.originalname.match(/\.(pdf|doc|docx|txt|xlsx|xls)$/i)) {
    return callback(new Error('Type de document non autorisé'), false)
  }
  callback(null, true)
}
const allFilesFilter = (
  req: Express.Request,
  file: Express.Multer.File,
  callback: FileFilterCallback,
): void => {
  if (file.originalname.match(/\.(exe|bat|cmd|sh|zip|rar)$/i)) {
    return callback(new Error('Type de fichier non autorisé'), false)
  }
  callback(null, true)
}

@Controller('files')
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  @Post('upload/image')
  @UseInterceptors(
    FileInterceptor('file', {
      storage,
      fileFilter: imageFileFilter,
      limits: {
        fileSize: 5 * 1024 * 1024,
      },
    }),
  )
  async uploadImage(
    @UploadedFile() file: Express.Multer.File,
    @Body(ValidationPipe) uploadDto: UploadFileDto,
  ): Promise<FileResponseDto> {
    return this.uploadService.uploadSingleFile(file, uploadDto)
  }

  @Post('upload/document')
  @UseInterceptors(
    FileInterceptor('file', {
      storage,
      fileFilter: documentFileFilter,
      limits: {
        fileSize: 10 * 1024 * 1024,
      },
    }),
  )
  async uploadDocument(
    @UploadedFile() file: Express.Multer.File,
    @Body(ValidationPipe) uploadDto: UploadFileDto,
  ): Promise<FileResponseDto> {
    return this.uploadService.uploadSingleFile(file, uploadDto)
  }

  @Post('upload')
  @UseInterceptors(
    FileInterceptor('file', {
      storage,
      fileFilter: allFilesFilter,
      limits: {
        fileSize: 20 * 1024 * 1024,
      },
    }),
  )
  async uploadFile(
    @UploadedFile() file: Express.Multer.File,
    @Body(ValidationPipe) uploadDto: UploadFileDto,
  ): Promise<FileResponseDto> {
    return this.uploadService.uploadSingleFile(file, uploadDto)
  }

  @Post('upload/multiple')
  @UseInterceptors(
    FilesInterceptor('files', 10, {
      storage,
      fileFilter: allFilesFilter,
      limits: {
        fileSize: 20 * 1024 * 1024,
      },
    }),
  )
  async uploadMultipleFiles(
    @UploadedFiles() files: Express.Multer.File[],
    @Body(ValidationPipe) uploadDto: UploadFileDto,
  ): Promise<FileResponseDto[]> {
    return this.uploadService.uploadMultipleFiles(files, uploadDto)
  }

  @Get(':id')
  async getFile(@Param('id') id: string): Promise<FileResponseDto> {
    return this.uploadService.getFileById(id)
  }

  @Get('user/:userId')
  async getUserFiles(
    @Param('userId') userId: string,
  ): Promise<FileResponseDto[]> {
    return this.uploadService.getUserFiles(userId)
  }

  @Get('download/:id')
  async downloadFile(
    @Param('id') id: string,
    @Res() res: Response,
  ): Promise<void> {
    const result = await this.uploadService.getFileStream(id)
    const { stream, file } = result as FileStreamResponse

    res.set({
      'Content-Type': file.mimetype,
      'Content-Disposition': `attachment; filename="${file.originalName}"`,
      'Content-Length': file.size.toString(),
    })

    stream.pipe(res)
  }

  @Get('view/:id')
  async viewFile(@Param('id') id: string, @Res() res: Response): Promise<void> {
    const result = await this.uploadService.getFileStream(id)
    const { stream, file } = result as FileStreamResponse

    res.set({
      'Content-Type': file.mimetype,
      'Content-Length': file.size.toString(),
    })


    stream.pipe(res)
  }

  @Delete(':id')
  async deleteFile(@Param('id') id: string): Promise<{ message: string }> {
    await this.uploadService.deleteFile(id)
    return { message: 'Fichier supprimé avec succès' }
  }

  @Get()
  async searchFiles(
    @Query('userId') userId?: string,
  ): Promise<FileResponseDto[]> {
    if (userId) {
      return this.uploadService.getUserFiles(userId)
    }

    return []
  }
}
