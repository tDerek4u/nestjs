import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {
  private users = [
    { id: 1, name: 'John Doe', age: 30, role: 'admin' },
    { id: 2, name: 'Jane Smith', age: 25, role: 'user' },
  ];

  findAll(role?: 'admin' | 'user') {
    if (role) {
      return this.users.filter((user) => user.role === role);
    }
    return this.users;
  }
  findOne(id: number) {
    return this.users.find((user) => user.id === id);
  }

  create(user: { name: string; age: number; role: 'admin' | 'user' }) {
    const maxId = this.users.reduce((max, u) => (u.id > max ? u.id : max), 0);
    const newUser = {
      id: maxId + 1,
      ...user,
    };
    this.users.push(newUser);
    return newUser;
  }

  update(
    id: number,
    updatedUser: { name?: string; age?: number; role?: 'admin' | 'user' },
  ) {
    this.users = this.users.map((user) =>
      user.id === id ? { ...user, ...updatedUser } : user,
    );
    return this.findOne(id);
  }

  delete(id: number) {
    const removedUser = this.findOne(id);
    this.users = this.users.filter((user) => user.id !== id);
    return removedUser;
  }
}
