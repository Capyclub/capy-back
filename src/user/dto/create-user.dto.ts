import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsInt, IsString, MinLength } from 'class-validator';

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
    example: 'Montpellier tzzs',
    description: 'The City of the user',
  })
  @IsString()
  city: string;

  @ApiProperty({ example: '123456', description: 'The postal code' })
  @IsInt()
  postal_code: number;

  @ApiProperty({ example: '22-05-2002', description: 'Date of birth' })
  @IsDate()
  date_of_birth: Date;
}
