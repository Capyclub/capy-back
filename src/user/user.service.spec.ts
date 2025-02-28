import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { getModelToken } from '@nestjs/mongoose';
import { User } from './schemas/user.schema';
import { NotFoundException } from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';

describe('UserService - Validations', () => {
  let userService: UserService;
  beforeEach(async () => {
    class UserModel {
      constructor(private data: any) {}
      save = jest.fn().mockResolvedValue(this.data); // Mock `save()`
      static find = jest.fn().mockReturnValue({
        exec: jest
          .fn()
          .mockResolvedValue([new UserModel({}), new UserModel({})]),
      });
      static findById = jest.fn().mockImplementation((id: string) => {
        if (id === '2') {
          return {
            exec: jest.fn().mockResolvedValue(null),
          };
        }
        return {
          exec: jest.fn().mockResolvedValue(new UserModel({})),
        };
      });
      static findByIdAndUpdate = jest
        .fn()
        .mockImplementation((id: string, updateDto: UpdateUserDto) => {
          if (id === '2') {
            return {
              exec: jest.fn().mockResolvedValue(null),
            };
          }
          return {
            exec: jest.fn().mockResolvedValue(new UserModel({ ...updateDto })),
          };
        });
      static update = jest.fn().mockResolvedValue({ n: 1, nModified: 1 });
      static findByIdAndDelete = jest.fn().mockImplementation((id: string) => {
        if (id === '1') {
          return {
            exec: jest.fn().mockResolvedValue(new UserModel({})),
          };
        }
        return {
          exec: jest.fn().mockResolvedValue(null),
        };
      });
      static create = jest
        .fn()
        .mockImplementation((dto) => Promise.resolve(new UserModel(dto))); // Mock `create()`
    }

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getModelToken(User.name),
          useValue: UserModel, // 🔹 Remplace `useValue: {}` par une classe simulée
        },
      ],
    }).compile();

    userService = module.get<UserService>(UserService);
  });

  it('should reject users under 18 years old', async () => {
    const birthDate = new Date();
    birthDate.setFullYear(birthDate.getFullYear() - 17);

    const invalidUser = {
      first_name: 'Test',
      last_name: 'User',
      email: 'test@example.com',
      password: 'StrongP@ssword123',
      city: 'Paris',
      postal_code: 75001,
      date_of_birth: birthDate,
    };

    await expect(userService.create(invalidUser)).rejects.toThrow(
      'You must be at least 18 years old',
    );
  });

  it('should accept users 18 years or older', async () => {
    const birthDate = new Date();
    birthDate.setFullYear(birthDate.getFullYear() - 18);

    const validUser = {
      first_name: 'Valid',
      last_name: 'User',
      email: 'valid@example.com',
      password: 'SecurePassword123',
      city: 'Lyon',
      postal_code: 69000,
      date_of_birth: birthDate,
    };

    await expect(userService.create(validUser)).resolves.toBeDefined();
  });

  it('should return an array of users', async () => {
    const users = await userService.findAll();
    expect(users).toBeInstanceOf(Array);
  });

  it('sould return a user by id', async () => {
    const user = await userService.findOne('1');
    expect(user).toBeDefined();
  });

  it('should return an exception if no user found', async () => {
    await expect(userService.findOne('2')).rejects.toThrow(
      new NotFoundException('User with ID "2" not found'),
    );
  });

  it('should update a user', async () => {
    const updateData: UpdateUserDto = { email: '' };
    const updatedUser = await userService.update('1', updateData);
    expect(updatedUser).toBeDefined();
  });

  it('should return an exception if no user found on update', async () => {
    const updateData: UpdateUserDto = { email: 'newemail@example.com' };

    await expect(userService.update('2', updateData)).rejects.toThrow(
      new NotFoundException('User with ID "2" not found'),
    );
  });

  it('should delete a user', async () => {
    await userService.delete('1');
    expect(userService.delete('1')).resolves.toBeUndefined();
  });

  it('should return an exception if no user found on delete', async () => {
    await expect(userService.delete('2')).rejects.toThrow(
      new NotFoundException('User with ID "2" not found'),
    );
  });
});
