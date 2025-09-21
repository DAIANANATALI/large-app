import {
  Controller,
  Post,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';

import { S3Service } from '~/common/services';

import { FilesService } from './files.service';

@Controller('files')
export class FilesController {
  constructor(
    private readonly filesService: FilesService,
    private readonly s3Service: S3Service,
  ) {}

  @Post('upload')
  @UseInterceptors(FilesInterceptor('files'))
  async upload(@UploadedFiles() files: Express.Multer.File[]) {
    const uploadResults = await Promise.all(
      files.map((file) => {
        return this.s3Service.uploadFile(
          file.originalname,
          file.buffer,
          file.mimetype,
        );
      }),
    );

    return uploadResults.map((r) => r.key);
  }
}
