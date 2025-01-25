import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsEmail,
  IsString,
  MinLength,
  IsOptional,
  Matches,
} from 'class-validator';

export class UpdateUserDTO {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @IsEmail({ require_tld: true }, { message: 'Invalid email address format' })
  @ApiProperty({ default: 'logan@who.com', required: false })
  email: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty({ message: 'Password cannot be empty' })
  @MinLength(8, { message: 'Password must be at least 8 characters long' })
  @ApiProperty({ example: 'StrongP@ssw0rd', required: false })
  @Matches(
    /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
    {
      message:
        'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character',
    }
  )
  password: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @MinLength(6, { message: 'Username must be at least 4 characters long' })
  @ApiProperty({ default: 'logan.who', required: false })
  username: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ default: 'Logan Who', required: false })
  name: string;
}
