import { Controller, Get, HttpStatus, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';

@Controller('payments')
export class PaymentsController {
  @Get()
  getPayments(@Req() request: Request, @Res() response: Response) {
    const { page, limit } = request.query;
    if (!limit || !page) {
      response.status(HttpStatus.BAD_REQUEST).send('Bad request');
      return;
    }
    response.status(HttpStatus.OK).send('OK');
  }
}
