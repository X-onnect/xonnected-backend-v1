import * as mongoose from 'mongoose';
export declare type ProfileDocument = Profile & mongoose.Document;
export interface IdObject {
    _id: mongoose.Types.ObjectId;
}
export declare class Profile {
    image: string;
    displayName: string;
    subscriptionPrice: number;
}
export declare class ProfileDto {
    image: string;
    displayName: string;
    subscriptionPrice: number;
}
export declare const ProfileSchema: mongoose.Schema<Profile, mongoose.Model<Profile, any, any, any, any>, {}, {}, any, {}, "type", Profile>;
