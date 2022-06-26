import * as mongoose from 'mongoose';
export declare type UserDocument = User & mongoose.Document;
interface IdObject {
    _id: string;
}
export declare class User {
    email: string;
    username: string;
    password: string;
    createdAt: string;
    subscribers: IdObject[];
    subscribedTo: IdObject[];
}
export declare const UserSchema: mongoose.Schema<User, mongoose.Model<User, any, any, any, any>, {}, {}, any, {}, "type", User>;
export declare const userDTO: {
    email: string;
    username: string;
    password: string;
};
export {};
