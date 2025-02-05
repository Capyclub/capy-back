import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsDate,
  IsInt,
  IsOptional,
  IsString,
  MinDate,
  MinLength,
} from 'class-validator';
import { Transform } from 'class-transformer';

export class CreateUserDto {
  @ApiProperty({ example: 'john', description: 'The username of the user' })
  @IsString()
  @MinLength(2)
  first_name: string;

  @ApiProperty({ example: 'doee', description: 'The last e name of the user' })
  @IsString()
  @MinLength(2)
  last_name: string;

  @ApiProperty({
    example: 'johndoe@gmail.com',
    description: 'The email of the user',
  })
  @IsString()
  email: string;

  @ApiProperty({
    example: 'StrongP@ssword123',
    description: 'User password (must be at least 8 characters)',
  })
  @IsString()
  @MinLength(8, { message: 'Password must be at least 8 characters long' })
  password: string;

  @ApiProperty({
    example: 'Montpellier tzzs',
    description: 'The City of the user',
  })
  @IsString()
  city: string;

  @ApiProperty({ example: '123456', description: 'The postal code' })
  @IsInt()
  postal_code: number;

  @ApiProperty({ example: '2002-05-22', description: 'Date of birth' })
  @Transform(({ value }) => new Date(value))
  @IsDate({ message: 'Invalid date format' })
  @MinDate(new Date(new Date().setFullYear(new Date().getFullYear() - 18)), {
    message: 'You must be at least 18 years old',
  })
  date_of_birth: Date;

  @ApiProperty({
    example: false,
    description: 'Is the user an admin?',
    required: false,
  })
  @IsBoolean()
  @IsOptional()
  isAdmin?: boolean;
}
