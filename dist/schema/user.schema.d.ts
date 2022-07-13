import * as mongoose from 'mongoose';
export declare type UserDocument = User & mongoose.Document;
export interface IdObject {
    _id: mongoose.Types.ObjectId;
}
export declare class User {
    email: string;
    username: string;
    password: string;
    createdAt: string;
    subscribers: string[];
    subscribedTo: string[];
}
export declare const UserSchema: mongoose.Schema<User, mongoose.Model<User, any, any, any, any>, {}, {}, any, {}, "type", User>;
export declare const userDTO: {
    email: string;
    username: string;
    password: string;
};
