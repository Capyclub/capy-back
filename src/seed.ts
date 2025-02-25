import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { UserService } from './user/user.service';
import { faker } from '@faker-js/faker';
import { CreateUserDto } from './user/dto/create-user.dto';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const userService = app.get(UserService);

  const admin: CreateUserDto = {
    first_name: 'Loise',
    last_name: 'Fenoll',
    email: 'loise.fenoll@ynov.com',
    password: 'ANKymoUTFu4rbybmQ9Mt',
    city: 'Paris',
    postal_code: 75001,
    date_of_birth: new Date('2000-01-01'),
    isAdmin: true,
  };

  await userService.create(admin);
  console.log('Admin created successfully!');


  const generateUser = (): CreateUserDto => ({
    first_name: faker.person.firstName(),
    last_name: faker.person.lastName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
    city: faker.location.city(),
    postal_code: parseInt(faker.location.zipCode(), 10),
    date_of_birth: faker.date.birthdate({ min: 18, max: 65, mode: 'age' }),
    isAdmin: faker.datatype.boolean(),
  });

  const users: CreateUserDto[] = Array.from({ length: 10 }, generateUser);

  for (const user of users) {
    await userService.create(user);
  }

  console.log('Database seeded with fake users.');
  await app.close();
}

bootstrap();
