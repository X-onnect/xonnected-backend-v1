import { Model } from 'mongoose';
import { User, UserDocument, userDTO } from '../schema/user.schema';
import { Wallet2Document } from 'src/schema/wallet-2.schema';
import { Profile, ProfileDocument, ProfileDto } from 'src/schema/profile.schema';
import { UserDto } from 'src/dto/response/user.dto';
export declare class UsersService {
    private userModel;
    private wallet2Model;
    private profileModel;
    constructor(userModel: Model<UserDocument>, wallet2Model: Model<Wallet2Document>, profileModel: Model<ProfileDocument>);
    findOne(email: string): Promise<User | undefined>;
    createUserProfile(_id: string): Promise<ProfileDocument>;
    findUserById(_id: string): Promise<UserDto | undefined>;
    findAll(): Promise<User[]>;
    createUser(user: typeof userDTO): Promise<UserDto>;
    update(id: string, username: string, email: string, password: string): Promise<UserDocument>;
    updateProfile(profile: ProfileDto, userId: string): Promise<Profile & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    deleteUser(id: string): Promise<import("mongodb").DeleteResult>;
}
