import { Injectable } from '@nestjs/common';
import { CreateUserDTO } from './dto/CreateUserDTO';
import { UpdateUserDTO } from './dto/UpdateUserDTO';

@Injectable()
export class UsersService {
  createNewUser(_createUserDTO: CreateUserDTO) {
    throw new Error('Method not implemented.');
  }

  updateUser(_id: string, _updateUserDTO: UpdateUserDTO) {
    throw new Error('Method not implemented.');
  }
}
