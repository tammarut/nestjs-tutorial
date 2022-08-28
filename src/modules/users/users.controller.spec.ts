import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

const mockUserService = {
  createNewUser: jest.fn((dto) => {
    return { _id: 12, email: dto.email };
  }),

  updateUser: jest.fn().mockImplementationOnce((id, dto) => ({ id, ...dto })),
  // createNewUser: (createUserDTO: CreateUserDTO) => {
  //   return { _id: 12, email: createUserDTO.email };
  // },
};

// class UserServiceStub {
//   createNewUser(createUserDTO: CreateUserDTO) {
//     return { _id: 12, email: createUserDTO.email };
//   }
// }

describe('UsersController', () => {
  let controller: UsersController;
  // let usersService: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [UsersService, { provide: UsersService, useValue: mockUserService }],
    })
      // .overrideProvider(UsersService)
      // .useValue(mockUserService)
      // .useClass(UserServiceStub)
      .compile();

    controller = module.get<UsersController>(UsersController);
    // usersService = module.get<UsersService>(UsersService);
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
    expect(mockUserService.createNewUser).toHaveBeenCalledTimes(1);
  });

  it('should update a user', () => {
    // Arrange
    const email = 'new_Mark@gmail.com';
    // Act
    controller.update('12', { email });
    // Assert
    expect(mockUserService.updateUser).toHaveBeenCalledTimes(1);
  });
});
