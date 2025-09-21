import { Module } from '@nestjs/common';

import { S3Service } from '~/common/services';

import { FilesController } from './files.controller';
import { FilesService } from './files.service';

@Module({
  controllers: [FilesController],
  exports: [FilesService, S3Service],
  providers: [FilesService, S3Service],
})
export class FilesModule {}
