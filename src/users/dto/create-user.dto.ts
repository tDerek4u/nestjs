import { IsEnum, IsString, IsNotEmpty, IsInt } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  name: string;
  @IsInt()
  age: number;
  @IsEnum(['admin', 'user'], { message: 'role must be either admin or user' })
  role: 'admin' | 'user';
}
