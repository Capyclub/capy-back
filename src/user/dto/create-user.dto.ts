import { ApiProperty } from '@nestjs/swagger';
import { IsString, MinLength } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ example: 'john_doe', description: 'The username of the user' })
  @IsString()
  @MinLength(4)
  username: string;

  @ApiProperty({ example: 'johndoe@gmail.colm', description: 'The email of the user' })
  @IsString()
  @MinLength(6)
  email: string;
}