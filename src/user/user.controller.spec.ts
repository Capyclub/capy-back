import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { getModelToken } from '@nestjs/mongoose';
import { User } from './schemas/user.schema';
import { AuthGuard } from '../auth/auth.guard';
import { JwtService } from '@nestjs/jwt';

describe('UserController', () => {
  let userController: UserController;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  let userService: UserService;
  let userModelMock: any;

  beforeEach(async () => {
    userModelMock = {
      new: jest
        .fn()
        .mockResolvedValue({ save: jest.fn().mockResolvedValue({}) }),
      constructor: jest.fn(),
      create: jest.fn().mockImplementation((dto) => Promise.resolve(dto)), // Mock `create`
      find: jest.fn().mockResolvedValue([]),
      findById: jest.fn().mockResolvedValue(null),
      save: jest.fn(),
    };

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
          provide: getModelToken(User.name),
          useValue: userModelMock,
        },
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
      ],
    }).compile();

    userController = module.get<UserController>(UserController);
    userService = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(userController).toBeDefined();
  });
});
