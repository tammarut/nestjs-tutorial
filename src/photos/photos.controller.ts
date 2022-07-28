import {
  BadRequestException,
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
import convertToJson from 'read-excel-file/schema';

interface SKUMappingDto {
  mercularSKU: string;
  supplierSKU: string;
  supplierId: string;
}

const SKU_MAPPING_SCHEMA = {
  'SKU Mercular': {
    prop: 'mercularSKU',
    type: String,
  },
  'SKU Sup.': {
    prop: 'supplierSKU',
    type: String,
  },
  'Sup.ID': {
    prop: 'supplierId',
    type: String,
  },
} as const;
const SKU_MAPPING_COLUMN: ReadonlyArray<string> = Object.keys(SKU_MAPPING_SCHEMA);

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
      const [headerRow] = rows;
      if (headerRow.join() !== SKU_MAPPING_COLUMN.join()) {
        throw new BadRequestException(
          'Invalid column header, it should be: ' + SKU_MAPPING_COLUMN.join()
        );
      }
      const contentRows = convertToJson(rows, SKU_MAPPING_SCHEMA);
      const skuMappingDto: SKUMappingDto[] = contentRows['rows'];
      const response = {
        message: 'Upload successfully',
        originalname: file.originalname,
        data: skuMappingDto,
        dataLength: skuMappingDto.length,
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
