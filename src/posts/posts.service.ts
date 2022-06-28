import { Injectable } from '@nestjs/common';
import { objectsHaveTheSameKeys } from 'src/utils/objectsHaveTheSameKeys';
import { Exceptions } from 'src/utils/exceptions';
import { Model, Types } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Post, PostDocument, PostDTO } from 'src/schema/post.schema';
import  { User, UserDocument } from '../schema/user.schema'; 

@Injectable()
export class PostsService {
    constructor(
        @InjectModel(Post.name) private postModel: Model<PostDocument>,
        @InjectModel(User.name) private userModel: Model<UserDocument>,
    ) {}

    async createPost(post: typeof PostDTO, _id: string) {
        const isPostObjectComplete = objectsHaveTheSameKeys(PostDTO, post);

        if (!isPostObjectComplete) {
            throw new Exceptions.IncompleteRequestException();
        }

        const subscribers: Types.ObjectId[] = [];

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
            subscribers,
        });

        return await createdPost.save();
    }
}
