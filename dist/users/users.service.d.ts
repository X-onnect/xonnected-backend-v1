import { Model } from 'mongoose';
import { User, UserDocument, userDTO } from '../schema/user.schema';
import { Wallet2Document } from 'src/schema/wallet-2.schema';
export declare class UsersService {
    private userModel;
    private wallet2Model;
    constructor(userModel: Model<UserDocument>, wallet2Model: Model<Wallet2Document>);
    findOne(email: string): Promise<User | undefined>;
    findUserById(_id: string): Promise<User | undefined>;
    findAll(): Promise<User[]>;
    createUser(user: typeof userDTO): Promise<UserDocument>;
    update(id: string, username: string, email: string, password: string): Promise<UserDocument>;
    deleteUser(id: string): Promise<import("mongodb").DeleteResult>;
}
