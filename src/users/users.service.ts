import { Injectable } from '@nestjs/common';
import { User } from './users.interface';

@Injectable()
export class UsersService {
    private readonly users: User[] = [{
        email: 'paul@gmail.com',
        password: 'something',
        userId:'00'
    }];

    async findOne(email: string): Promise<User | undefined> {
        return this.users.find(user => user.email === email)
    }

    async findAll(): Promise<User[]> {
        return this.users
    }

    async createUser(user: User): Promise<void> {
        this.users.push(user);
    }
}
