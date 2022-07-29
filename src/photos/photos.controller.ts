import {
  BadRequestException,
  Controller,
  Get,
  InternalServerErrorException,
  Param,
  Post,
  Res,
  UnsupportedMediaTypeException,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Response } from 'express';
import fs from 'fs/promises';
// import multer from 'multer';
import path from 'path';
import readXlsxFile, { Row } from 'read-excel-file/node';
import convertToJson from 'read-excel-file/schema';

interface SKUMappingDto {
  readonly mercularSKU: string;
  readonly supplierSKU: string;
  readonly supplierId: string;
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
    // FileInterceptor('file', {
    //   storage: multer.diskStorage({
    //     destination: './tmp/sku-mapping',
    //     filename: (_, file, callback) => {
    //       const fileExtension = path.extname(file.originalname);
    //       const filename = path.basename(file.originalname, fileExtension);
    //       const randomSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    //       const newFilename = `${filename}_${randomSuffix}${fileExtension}`;
    //       callback(null, newFilename);
    //     },
    //   }),
    //   fileFilter: (_, file, callback) => {
    //     const fileExtension = path.extname(file.originalname);
    //     if (!fileExtension.includes('.xlsx')) {
    //       return callback(new Error('Only Xlsx file are allowed!'), false);
    //     }
    //     callback(null, true);
    //   },
    // })
    FileInterceptor('file', {
      dest: './tmp/uploads/sku-mapping',
      fileFilter: (_, file, callback) => {
        const fileExtension = path.extname(file.originalname);
        if (!fileExtension.includes('.xlsx')) {
          return callback(new UnsupportedMediaTypeException('Only Xlsx file are allowed!'), false);
        }
        callback(null, true);
      },
    })
  )
  async uploadSingle(@UploadedFile() file: Express.Multer.File) {
    const [fileContent, readExcelError] = await readExcelFile(file.path);
    if (readExcelError) {
      throw new InternalServerErrorException(readExcelError);
    }
    if (fileContent.headerRow.join() !== SKU_MAPPING_COLUMN.join()) {
      throw new BadRequestException(
        'Invalid column header, it should be: ' + SKU_MAPPING_COLUMN.join()
      );
    }
    const response = {
      message: 'Upload successfully',
      originalname: file.originalname,
      data: fileContent.contentRows,
      dataLength: fileContent.contentRows.length,
    };
    return response;
  }

  @Get('filename')
  getFilePath(@Param('filename') filename: string, @Res() response: Response) {
    return response.sendFile(filename, { root: './tmp/sku-mapping' });
  }
}

type ExcelResult = [Optional<{ headerRow: Row; contentRows: SKUMappingDto[] }>, Optional<Error>];
async function readExcelFile(filePath: string): Promise<ExcelResult> {
  try {
    const rows = await readXlsxFile(filePath);
    const [headerRow] = rows;
    const contentRows = convertToJson(rows, SKU_MAPPING_SCHEMA);
    const skuMappingDto: SKUMappingDto[] = contentRows['rows'];

    return [{ headerRow, contentRows: skuMappingDto }, null];
  } catch (err) {
    return [null, err];
  } finally {
    fs.unlink(filePath);
  }
}
