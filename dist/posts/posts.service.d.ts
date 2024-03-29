import { Model, Types } from 'mongoose';
import { Post, PostDocument, postDTO, editPostDTO } from 'src/schema/post.schema';
import { UserDocument } from '../schema/user.schema';
export declare class PostsService {
    private postModel;
    private userModel;
    constructor(postModel: Model<PostDocument>, userModel: Model<UserDocument>);
    createPost(post: typeof postDTO, _id: string): Promise<PostDocument>;
    deletePost(postId: string, userId: Types.ObjectId): Promise<import("mongodb").DeleteResult>;
    updatePost(post: typeof editPostDTO, postId: Types.ObjectId, userId: Types.ObjectId): Promise<Post & import("mongoose").Document<any, any, any> & {
        _id: Types.ObjectId;
    }>;
    getPostById(postId: Types.ObjectId, userId: Types.ObjectId): Promise<{
        post: PostDocument;
        comments: (Post & import("mongoose").Document<any, any, any> & {
            _id: Types.ObjectId;
        })[];
        canBeViewed: boolean;
    }>;
    getAllPosts(userId: Types.ObjectId): Promise<{
        post: Post & import("mongoose").Document<any, any, any> & {
            _id: Types.ObjectId;
        };
        canBeViewed: boolean;
    }[]>;
    subscribeToPost(userId: Types.ObjectId, postId: string): Promise<Post & import("mongoose").Document<any, any, any> & {
        _id: Types.ObjectId;
    }>;
    subscribeToUser(userId: string, subscribee: string): Promise<{
        message: string;
    }>;
    likePost(postId: string, userId: string): Promise<PostDocument>;
    unlikePost(postId: string, userId: Types.ObjectId): Promise<PostDocument>;
    commentOnPost(postId: Types.ObjectId, post: typeof postDTO, _id: string): Promise<Post & import("mongoose").Document<any, any, any> & {
        _id: Types.ObjectId;
    }>;
}
