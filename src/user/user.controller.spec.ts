import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { AuthGuard } from '../auth/auth.guard';
import { JwtService } from '@nestjs/jwt';

describe('UserController', () => {
  let userController: UserController;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  let userService: UserService;

  beforeEach(async () => {
    const jwtServiceMock = {
      sign: jest.fn(() => 'mocked_jwt_token'),
      verify: jest.fn(() => ({
        email: 'test@example.com',
        sub: '1234',
        isAdmin: true,
      })),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        UserService,
        {
          provide: JwtService,
          useValue: jwtServiceMock,
        },
        {
          provide: AuthGuard,
          useValue: {
            canActivate: jest.fn(() => true),
          },
        },
        {
          provide: UserService,
          useValue: {
            findAll: jest.fn().mockResolvedValue([]),
            findOne: jest.fn().mockResolvedValue({}),
            create: jest.fn().mockResolvedValue({}),
            update: jest.fn().mockResolvedValue({}),
            delete: jest.fn().mockResolvedValue({}),
          },
        },
      ],
    }).compile();

    userController = module.get<UserController>(UserController);
    userService = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(userController).toBeDefined();
  });

  it('should return an array of users', async () => {
    const users = await userController.findAll();
    expect(users).toBeInstanceOf(Array);
    expect(userService.findAll).toHaveBeenCalled();
  });

  it('should return a single user', async () => {
    const user = await userController.findOne('1');
    expect(user).toBeDefined();
    expect(userService.findOne).toHaveBeenCalledWith('1');
  });

  it('should create a new user', async () => {
    const newUser = {
      first_name: 'Test',
      last_name: 'User',
      email: 'testuser@gmail.com',
      city: 'Paris',
      postal_code: 75001,
      date_of_birth: new Date('2000-01-01'),
      password: 'StrongP@ssword123',
      isAdmin: false,
    };
    const user = await userController.create(newUser);
    expect(user).toBeDefined();
  });

  it('should update a user', async () => {
    const updatedUser = {
      first_name: 'Test',
      last_name: 'User',
      email: '',
      city: 'Paris',
      postal_code: 75001,
      date_of_birth: new Date('2000-01-01'),
      password: 'StrongP@ssword123',
      isAdmin: false,
    };
    const user = await userController.update('1', updatedUser);
    expect(user).toBeDefined();
  });

  it('should delete a user', async () => {
    const user = await userController.delete('1', { user: { isAdmin: true } });
    expect(user).toBeDefined();
  });

  it('should throw an error if user is not an admin', async () => {
    await expect(
      userController.delete('1', { user: { isAdmin: false } }),
    ).rejects.toThrow('Only admins can delete users');
  });
});
