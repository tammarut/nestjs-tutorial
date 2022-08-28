import { Injectable } from '@nestjs/common';
import { CreateUserDTO } from './dto/CreateUserDTO';

@Injectable()
export class UsersService {
  createNewUser(createUserDTO: CreateUserDTO) {
    throw new Error('Method not implemented.');
  }
}
