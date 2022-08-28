import { Injectable } from '@nestjs/common';
import { CreateUserDTO } from './dto/CreateUserDTO';
import { UpdateUserDTO } from './dto/UpdateUserDTO';

@Injectable()
export class UsersService {
  createNewUser(createUserDTO: CreateUserDTO) {
    throw new Error('Method not implemented.');
  }

  updateUser(id: string, updateUserDTO: UpdateUserDTO) {
    throw new Error('Method not implemented.');
  }
}
