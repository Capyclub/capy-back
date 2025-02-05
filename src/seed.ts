import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { UserService } from './user/user.service';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const userService = app.get(UserService);

  const admin = {
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
  await app.close();
}

bootstrap();
