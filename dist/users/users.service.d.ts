import { Model } from 'mongoose';
import { User, UserDocument, userDTO } from '../schema/user.schema';
import { Wallet2Service } from 'src/wallet-2/wallet-2.service';
export declare class UsersService {
    private userModel;
    private walletService;
    constructor(userModel: Model<UserDocument>, walletService: Wallet2Service);
    findOne(email: string): Promise<User | undefined>;
    findUserById(_id: string): Promise<User | undefined>;
    findAll(): Promise<User[]>;
    createUser(user: typeof userDTO): Promise<UserDocument>;
    update(id: string, username: string, email: string, password: string): Promise<UserDocument>;
    deleteUser(id: string): Promise<import("mongodb").DeleteResult>;
}
