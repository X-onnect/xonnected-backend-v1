import * as mongoose from 'mongoose';
export declare type PostDocument = Post & mongoose.Document;
export declare class Post {
    text: string;
    image: string;
    likes: mongoose.Types.ObjectId[];
    createdAt: string;
    createdBy: mongoose.Types.ObjectId;
    comments: string[];
    isFree: boolean;
    price: number;
    subscribersFromCreator: string[];
    subscribers: string[];
    isComment: boolean;
    parent: mongoose.Types.ObjectId | null;
}
export declare const PostSchema: mongoose.Schema<Post, mongoose.Model<Post, any, any, any, any>, {}, {}, any, {}, "type", Post>;
export declare const postDTO: {
    text: string;
    image: string;
    isFree: boolean;
    price: number;
};
export declare const editPostDTO: {
    text: string;
};
