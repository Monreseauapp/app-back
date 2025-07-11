import { IsOptional, IsString, IsBoolean } from 'class-validator'

export class UploadFileDto {
  @IsOptional()
  @IsString()
  userId?: string

  @IsOptional()
  @IsString()
  category?: string

  @IsOptional()
  @IsString()
  description?: string

  @IsOptional()
  @IsBoolean()
  isPublic?: boolean
}

export class FileResponseDto {
  id: string
  filename: string
  originalName: string
  mimetype: string
  size: number
  url: string
  uploadedAt: Date
  category?: string
  description?: string
  isPublic: boolean
}
