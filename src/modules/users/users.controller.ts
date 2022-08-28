import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDTO } from './dto/CreateUserDTO';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Post()
  create(@Body() createUserDTO: CreateUserDTO) {
    return this.userService.createNewUser(createUserDTO);
  }
}
