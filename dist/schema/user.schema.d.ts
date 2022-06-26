import * as mongoose from 'mongoose';
export declare type UserDocument = User & mongoose.Document;
export declare class User {
    email: string;
    username: string;
    password: string;
}
export declare const UserSchema: mongoose.Schema<any, mongoose.Model<any, any, any, any, any>, {}, {}, any, {}, "type", {
    email?: string;
    username?: string;
    password?: string;
}>;
