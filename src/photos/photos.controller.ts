import {
  Controller,
  Get,
  InternalServerErrorException,
  Param,
  Post,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Response } from 'express';
import fs from 'fs/promises';
import multer from 'multer';
import path from 'path';
import readXlsxFile from 'read-excel-file/node';

@Controller('photos')
export class PhotoController {
  @Post('upload')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: multer.diskStorage({
        destination: './tmp/sku-mapping',
        filename: (_, file, callback) => {
          const fileExtension = path.extname(file.originalname);
          const filename = path.basename(file.originalname, fileExtension);
          const randomSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
          const newFilename = `${filename}_${randomSuffix}${fileExtension}`;
          callback(null, newFilename);
        },
      }),
      fileFilter: (_, file, callback) => {
        const fileExtension = path.extname(file.originalname);
        if (!fileExtension.includes('.xlsx')) {
          return callback(new Error('Only Xlsx file are allowed!'), false);
        }
        callback(null, true);
      },
      // storage: memoryStorage(),
    })
  )
  async uploadSingle(@UploadedFile() file: Express.Multer.File) {
    try {
      const rows = await readXlsxFile(file.path);
      const response = {
        message: 'Upload successfully',
        originalname: file.originalname,
        data: rows,
      };
      return response;
    } catch (err) {
      throw new InternalServerErrorException(err);
    } finally {
      fs.unlink(file.path);
    }
  }

  @Get('filename')
  getFilePath(@Param('filename') filename: string, @Res() response: Response) {
    return response.sendFile(filename, { root: './tmp/sku-mapping' });
  }
}
