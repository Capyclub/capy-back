import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { getModelToken } from '@nestjs/mongoose';
import { User } from './schemas/user.schema';

describe('UserService - Validations', () => {
  let userService: UserService;
  beforeEach(async () => {
    class UserModel {
      constructor(private data: any) {}
      save = jest.fn().mockResolvedValue(this.data); // Mock `save()`
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
});
