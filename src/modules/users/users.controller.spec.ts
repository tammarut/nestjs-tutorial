import { Test, TestingModule } from '@nestjs/testing';
import { CreateUserDTO } from './dto/CreateUserDTO';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

const mockUserService = {
  createNewUser: (createUserDTO: CreateUserDTO) => {
    return { _id: 12, email: createUserDTO.email };
  },
};

// class UserServiceStub {
//   createNewUser(createUserDTO: CreateUserDTO) {
//     return { _id: 12, email: createUserDTO.email };
//   }
// }

describe('UsersController', () => {
  let controller: UsersController;
  let usersService: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [UsersService],
    })
      .overrideProvider(UsersService)
      .useValue(mockUserService)
      // .useClass(UserServiceStub)
      .compile();

    controller = module.get<UsersController>(UsersController);
    usersService = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a new user', () => {
    // Arrange
    const email = 'Mark@gmail.com';
    // Act
    const result = controller.create({ email });
    // Assert
    expect(result).toEqual({
      _id: expect.any(Number),
      email: email,
    });
    // expect(usersService.createNewUser).toHaveBeenCalledTimes(1);
  });
});
