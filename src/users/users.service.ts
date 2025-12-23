import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserdto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  private users = [
    { id: 1, name: 'John Doe', age: 30, role: 'admin' },
    { id: 2, name: 'Jane Smith', age: 25, role: 'user' },
  ];

  findAll(role?: 'admin' | 'user') {
    if (role) {
      const filteredUsers = this.users.filter((user) => user.role === role);
      if (filteredUsers.length === 0) {
        throw new NotFoundException('No users found with the specified role');
      }
      return filteredUsers;
    }
    return this.users;
  }
  findOne(id: number) {
    const user = this.users.find((user) => user.id === id);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  create(createUserDto: CreateUserDto) {
    const maxId = this.users.reduce((max, u) => (u.id > max ? u.id : max), 0);
    const newUser = {
      id: maxId + 1,
      ...createUserDto,
    };
    this.users.push(newUser);
    return newUser;
  }

  update(id: number, updatedUserDto: UpdateUserdto) {
    this.users = this.users.map((user) =>
      user.id === id ? { ...user, ...updatedUserDto } : user,
    );
    return this.findOne(id);
  }

  delete(id: number) {
    const removedUser = this.findOne(id);
    this.users = this.users.filter((user) => user.id !== id);
    return removedUser;
  }
}
