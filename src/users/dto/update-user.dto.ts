import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserdto extends PartialType(CreateUserDto) {
  name?: string;
  age?: number;
  role?: 'admin' | 'user';
}
