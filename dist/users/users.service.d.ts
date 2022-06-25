import { Model } from 'mongoose';
import { User, UserDocument } from '../schema/user.schema';
export declare class UsersService {
    private userModel;
    constructor(userModel: Model<UserDocument>);
    findOne(email: string): Promise<User | undefined>;
    findAll(): Promise<User[]>;
    createUser(user: User): Promise<UserDocument>;
    update(id: string, username: string, email: string, password: string): Promise<UserDocument>;
    delete(id: string): Promise<import("mongodb").DeleteResult>;
}
