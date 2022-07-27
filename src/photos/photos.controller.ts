import { Controller, Get, Param, Post, Res, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Response } from 'express';
import { diskStorage } from 'multer';
import { extname } from 'path';

@Controller('photos')
export class PhotoController {
  @Post('upload')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads',
        filename: (_req, file, callback) => {
          const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
          const fileExtension = extname(file.originalname);
          const filename = `${file.originalname}_${uniqueSuffix}${fileExtension}`;
          callback(null, filename);
        },
      }),
    })
  )
  uploadSingle(@UploadedFile() file: Express.Multer.File) {
    console.log(file);
    const response = {
      filename: file.filename,
      originalname: file.originalname,
      message: 'Upload successfully',
    };
    return response;
  }

  @Get(':image_path')
  getFilePath(@Param('image_path') image: string, @Res() response: Response) {
    console.info(image);
    return response.sendFile(image, { root: './uploads' });
  }
}
