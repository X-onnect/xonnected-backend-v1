import { Model } from 'mongoose';
import { User, UserDocument, userDTO } from '../schema/user.schema';
export declare class UsersService {
    private userModel;
    constructor(userModel: Model<UserDocument>);
    findOne(email: string): Promise<User | undefined>;
    findUserById(_id: string): Promise<User | undefined>;
    findAll(): Promise<User[]>;
    createUser(user: typeof userDTO): Promise<UserDocument>;
    update(id: string, username: string, email: string, password: string): Promise<UserDocument>;
    delete(id: string): Promise<import("mongodb").DeleteResult>;
}
