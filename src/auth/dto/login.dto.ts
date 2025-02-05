import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export class LoginDto {
  @ApiProperty({ example: 'loise.fenoll@ynov.com', description: 'User email' })
  @IsEmail({}, { message: 'Invalid email format' })
  email: string;

  @ApiProperty({
    example: 'ANKymoUTFu4rbybmQ9Mt',
    description: 'User password',
  })
  @IsString()
  password: string;
}
