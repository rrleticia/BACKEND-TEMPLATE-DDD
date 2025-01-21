import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsEmail,
  IsString,
  MinLength,
  IsOptional,
} from 'class-validator';

export class UpdateUserDTO {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @IsEmail({ require_tld: true }, { message: 'Invalid email address format' })
  @ApiProperty({ default: 'logan@who.com', required: true })
  email: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @MinLength(6, { message: 'Username must be at least 4 characters long' })
  @ApiProperty({ default: 'logan.who', required: true })
  username: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ default: 'Logan Who', required: false })
  name: string;
}
