import { Module } from '@nestjs/common';
import { PhotoController } from './photos.controller';

@Module({
  controllers: [PhotoController],
})
export class PhotoModule {}
