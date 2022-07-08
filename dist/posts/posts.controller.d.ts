import { PostsService } from './posts.service';
export declare class PostsController {
    private postsService;
    constructor(postsService: PostsService);
    createPost(req: any, body: any): Promise<import("../schema/post.schema").PostDocument>;
    deletePost(req: any, param: any): Promise<{
        message: string;
    }>;
    updatePost(body: any, param: any, req: any): Promise<{
        message: string;
        data: import("../schema/post.schema").Post & import("mongoose").Document<any, any, any> & {
            _id: import("mongoose").Types.ObjectId;
        };
    }>;
    getPost(param: any, req: any): Promise<{
        post: import("../schema/post.schema").PostDocument;
        comments: (import("../schema/post.schema").Post & import("mongoose").Document<any, any, any> & {
            _id: import("mongoose").Types.ObjectId;
        })[];
        canBeViewed: boolean;
    }>;
    getAllPosts(req: any): Promise<{
        post: import("../schema/post.schema").Post & import("mongoose").Document<any, any, any> & {
            _id: import("mongoose").Types.ObjectId;
        };
        canBeViewed: boolean;
    }[]>;
    subscribeToPost(req: any, param: any): Promise<import("../schema/post.schema").Post & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    subscribeToUser(req: any, param: any): Promise<{
        message: string;
    }>;
    likePost(request: any, param: any): Promise<import("../schema/post.schema").PostDocument>;
    dislikePost(request: any, param: any): Promise<import("../schema/post.schema").PostDocument>;
    commentOnPost(req: any, body: any, param: any): Promise<import("../schema/post.schema").Post & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }>;
}
