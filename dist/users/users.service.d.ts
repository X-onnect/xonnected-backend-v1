import { User } from './users.interface';
export declare class UsersService {
    private readonly users;
    findOne(email: string): Promise<User | undefined>;
    findAll(): Promise<User[]>;
    createUser(user: User): Promise<void>;
}
