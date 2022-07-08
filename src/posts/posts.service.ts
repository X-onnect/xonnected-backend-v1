import { Injectable, UnauthorizedException } from '@nestjs/common';
import { objectsHaveTheSameKeys } from 'src/utils/objectsHaveTheSameKeys';
import { Exceptions } from 'src/utils/exceptions';
import { Model, Types } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Post, PostDocument, postDTO, editPostDTO } from 'src/schema/post.schema';
import { User, UserDocument } from '../schema/user.schema'; 

@Injectable()
export class PostsService {
    constructor(
        @InjectModel(Post.name) private postModel: Model<PostDocument>,
        @InjectModel(User.name) private userModel: Model<UserDocument>,
    ) {}

    async createPost(post: typeof postDTO, _id: string) {
        const isPostObjectComplete = objectsHaveTheSameKeys(postDTO, post);

        if (!isPostObjectComplete) {
            throw new Exceptions.IncompleteRequestException();
        }

        const subscribers: string[] = [];

        if (!post.isFree) {
            const postMaker = await this.userModel.findById(_id).exec();

            if (postMaker) {
                subscribers.push(...postMaker.subscribers);
            }
        }

        const createdPost = new this.postModel({
            ...post,
            likes: [],
            createdAt: new Date().toISOString(),
            comments: [],
            createdBy: _id,
            subscribers: [],
            subscribersFromCreator: subscribers,
            isComment: false,
        });

        return await createdPost.save();
    }

    async deletePost(postId: string, userId: Types.ObjectId) {
        let postToDelete;

        try {
            postToDelete = await this.postModel.findById(postId).exec();
        } catch(e) {
            throw new Exceptions.RecordNotFoundException();
        }

        if (!postToDelete) {
            throw new Exceptions.RecordNotFoundException();
        }

        if (postToDelete.createdBy.toString() !== userId.toString()) {
            throw new UnauthorizedException();
        }

        return await this.postModel.deleteOne({ _id: postId });
    }

    async updatePost(post: typeof editPostDTO, postId: Types.ObjectId, userId: Types.ObjectId) {
        if (!objectsHaveTheSameKeys(editPostDTO, post)) {
            throw new Exceptions.IncompleteRequestException();
        }

        let postToUpdate: PostDocument;

        try {
            postToUpdate = await this.postModel.findById(postId).exec();
        } catch(e) {
            throw new Exceptions.RecordNotFoundException();
        }

        if (!postToUpdate) {
            throw new Exceptions.RecordNotFoundException();
        }

        if (postToUpdate.createdBy.toString() !== userId.toString()) {
            throw new UnauthorizedException();
        }     
        
        const { text } = post;
        
        return await this.postModel.findByIdAndUpdate(postId, { text }, { new: true })
    }

    async getPostById(postId: Types.ObjectId, userId: Types.ObjectId) {
        let post: PostDocument;

        try {
            post = await this.postModel.findById(postId).exec();
        } catch(e) {
            throw new Exceptions.RecordNotFoundException();
        }

        if (!post) {
            throw new Exceptions.RecordNotFoundException();
        }

        const canBeViewed = !post.isFree && !post.subscribers.includes(userId.toString()) && (post.createdBy.toString() !== userId.toString()) ? 
            false : 
            true;

        return { post, canBeViewed }
    }

    async getAllPosts(userId: Types.ObjectId) {
        const posts = await this.postModel.find({}).exec();

        const updatedPosts = posts.reverse().map((post) => {
        const canBeViewed = 
            !post.isFree &&         // post is not free
            !post.subscribers.includes(userId.toString()) &&   // user is not subscribed to post
            !post.subscribersFromCreator.includes(userId.toString()) && // user is not subscribed to owner of post
            (post.createdBy.toString() !== userId.toString())   // user is not creator of post
        ? 
            false : 
            true;

            return { post, canBeViewed }
        })

        return updatedPosts;
    }

    async subscribeToPost(userId: Types.ObjectId, postId: string) {
        const post = await this.postModel.findById(postId).exec();

        if (post) {
            const subscribers = post.subscribers;

            if (subscribers.indexOf(userId.toString()) === -1) {
                await this.postModel.findByIdAndUpdate(postId, { subscribers: [...subscribers, userId.toString()] }).exec();

                return await this.postModel.findById(postId);
            }
            else {
                return post;
            }
        }
        else {
            throw new Exceptions.RecordNotFoundException();
        }
    }

    async subscribeToUser(userId: string, subscribee: string) {
        const user = await this.userModel.findById(subscribee).exec();

        if (!user) {
            throw new Exceptions.RecordNotFoundException();
        }

        const subscribers = user.subscribers;

        if (subscribers.indexOf(userId) === -1) {
            await this.userModel.findByIdAndUpdate(subscribee, { subscribers: [...subscribers, userId.toString()] }).exec();
        }

        await this.postModel.updateMany({ createdBy: subscribee }, { subscribersFromCreator: subscribers });

        return { message: 'Success' };
    }

    async likePost(postId: string, userId: string) {
        let post: PostDocument;

        try {
            post = await this.postModel.findById(postId).exec();
        } catch(e) {
            throw new Exceptions.RecordNotFoundException();
        }

        if (!post) {
            throw new Exceptions.RecordNotFoundException();
        }

        if (post.likes.indexOf(new Types.ObjectId(userId)) === -1) {
            return await this.postModel.findByIdAndUpdate(postId, {'$push': { likes: userId }}, { new: true }).exec();
        }

        return post;
    }

    async unlikePost(postId: string, userId: Types.ObjectId) {
        let post: PostDocument;

        try {
            post = await this.postModel.findById(postId).exec();
        } catch(e) {
            throw new Exceptions.RecordNotFoundException();
        }

        if (!post) {
            throw new Exceptions.RecordNotFoundException();
        }

        if (post.likes.indexOf(new Types.ObjectId(userId)) !== -1) {
            const updatedLikes = post.likes.filter((like) => {
                if (like.equals(userId)) return false;
                else return true;
            });

            return await this.postModel.findByIdAndUpdate(postId, { likes: updatedLikes }, { new: true }).exec();
        }

        return post;
    }

    async commentOnPost(postId: Types.ObjectId, post: typeof postDTO, _id: string) {
        const isPostObjectComplete = objectsHaveTheSameKeys(postDTO, post);

        if (!isPostObjectComplete) {
            throw new Exceptions.IncompleteRequestException();
        }

        const createdPost: Post = {
            ...post,
            likes: [],
            createdAt: new Date().toISOString(),
            comments: [],
            createdBy: new Types.ObjectId(_id),
            subscribers: [],
            subscribersFromCreator: [],
            isComment: true,
            isFree: true,
            price: 0,
        };

        const updatedPost = await this.postModel.findByIdAndUpdate(postId, { $push: { comments: createdPost } }, { new: true });

        if (!updatedPost) throw new Exceptions.RecordNotFoundException();

        return updatedPost;
    }
}
