import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { UploadController } from './upload.controller';
import { UploadService } from './upload.service';
import { diskStorage } from 'multer';
import { extname } from 'path';
import * as fs from 'fs';

@Module({
  imports: [
    MulterModule.registerAsync({
      useFactory: () => {
        const uploadDir = './uploads';
        if (!fs.existsSync(uploadDir)) {
          fs.mkdirSync(uploadDir, { recursive: true });
        }

        return {
          storage: diskStorage({
            destination: uploadDir,
            filename: (req, file, callback) => {
              const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
              const extension = extname(file.originalname);
              callback(null, `${file.fieldname}-${uniqueSuffix}${extension}`);
            },
          }),
          limits: {
            fileSize: 50 * 1024 * 1024,
            files: 10,
          },
        };
      },
    }),
  ],
  controllers: [UploadController],
  providers: [UploadService],
  exports: [UploadService],
})
export class UploadModule {}