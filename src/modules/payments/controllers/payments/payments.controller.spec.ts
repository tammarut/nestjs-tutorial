import { Test } from '@nestjs/testing';
import { Request, Response } from 'express';
import { PaymentsController } from './payments.controller';

describe('PaymentsController', () => {
  let controller: PaymentsController;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      controllers: [PaymentsController],
    }).compile();

    controller = module.get<PaymentsController>(PaymentsController);
  });

  it('Controller should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getPayments', () => {
    it('should return OK(200)', () => {
      // Arrange
      const fakeReq = { query: { page: 1, limit: 5 } } as unknown as Request;
      const fakeResponse = {
        status: jest.fn().mockReturnThis(),
        send: jest.fn().mockReturnThis(),
      } as unknown as Response;
      // Act
      controller.getPayments(fakeReq, fakeResponse);
      // Assert
      expect(fakeResponse.status).toHaveBeenCalledWith(200);
    });

    it('should return Bad request(400)', () => {
      // Arrange
      const fakeReq = { query: {} } as unknown as Request;
      const fakeResponse = {
        status: jest.fn().mockReturnThis(),
        send: jest.fn().mockReturnThis(),
      } as unknown as Response;

      // Act
      controller.getPayments(fakeReq, fakeResponse);

      // Assert
      expect(fakeResponse.status).toHaveBeenCalledWith(400);
    });
  });
});
