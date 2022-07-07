"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostsService = void 0;
const common_1 = require("@nestjs/common");
const objectsHaveTheSameKeys_1 = require("../utils/objectsHaveTheSameKeys");
const exceptions_1 = require("../utils/exceptions");
const mongoose_1 = require("mongoose");
const mongoose_2 = require("@nestjs/mongoose");
const post_schema_1 = require("../schema/post.schema");
const user_schema_1 = require("../schema/user.schema");
let PostsService = class PostsService {
    constructor(postModel, userModel) {
        this.postModel = postModel;
        this.userModel = userModel;
    }
    async createPost(post, _id) {
        const isPostObjectComplete = (0, objectsHaveTheSameKeys_1.objectsHaveTheSameKeys)(post_schema_1.postDTO, post);
        if (!isPostObjectComplete) {
            throw new exceptions_1.Exceptions.IncompleteRequestException();
        }
        const subscribers = [];
        if (!post.isFree) {
            const postMaker = await this.userModel.findById(_id).exec();
            if (postMaker) {
                subscribers.push(...postMaker.subscribers);
            }
        }
        const createdPost = new this.postModel(Object.assign(Object.assign({}, post), { likes: [], createdAt: new Date().toISOString(), comments: [], createdBy: _id, subscribers: [], subscribersFromCreator: subscribers }));
        return await createdPost.save();
    }
    async deletePost(postId, userId) {
        let postToDelete;
        try {
            postToDelete = await this.postModel.findById(postId).exec();
        }
        catch (e) {
            throw new exceptions_1.Exceptions.RecordNotFoundException();
        }
        if (!postToDelete) {
            throw new exceptions_1.Exceptions.RecordNotFoundException();
        }
        if (postToDelete.createdBy.toString() !== userId.toString()) {
            throw new common_1.UnauthorizedException();
        }
        return await this.postModel.deleteOne({ _id: postId });
    }
    async updatePost(post, postId, userId) {
        if (!(0, objectsHaveTheSameKeys_1.objectsHaveTheSameKeys)(post_schema_1.editPostDTO, post)) {
            throw new exceptions_1.Exceptions.IncompleteRequestException();
        }
        let postToUpdate;
        try {
            postToUpdate = await this.postModel.findById(postId).exec();
        }
        catch (e) {
            throw new exceptions_1.Exceptions.RecordNotFoundException();
        }
        if (!postToUpdate) {
            throw new exceptions_1.Exceptions.RecordNotFoundException();
        }
        if (postToUpdate.createdBy.toString() !== userId.toString()) {
            throw new common_1.UnauthorizedException();
        }
        const { text } = post;
        await this.postModel.findByIdAndUpdate(postId, { text });
        return await this.postModel.findById(postId);
    }
    async getPostById(postId, userId) {
        let post;
        try {
            post = await this.postModel.findById(postId).exec();
        }
        catch (e) {
            throw new exceptions_1.Exceptions.RecordNotFoundException();
        }
        if (!post) {
            throw new exceptions_1.Exceptions.RecordNotFoundException();
        }
        const canBeViewed = !post.isFree && !post.subscribers.includes(userId.toString()) && (post.createdBy.toString() !== userId.toString()) ?
            false :
            true;
        return { post, canBeViewed };
    }
    async getAllPosts(userId) {
        const posts = await this.postModel.find({}).exec();
        const updatedPosts = posts.reverse().map((post) => {
            const canBeViewed = !post.isFree &&
                !post.subscribers.includes(userId.toString()) &&
                !post.subscribersFromCreator.includes(userId.toString()) &&
                (post.createdBy.toString() !== userId.toString())
                ?
                    false :
                true;
            return { post, canBeViewed };
        });
        return updatedPosts;
    }
    async subscribeToPost(userId, postId) {
        const post = await this.postModel.findById(postId).exec();
        if (post) {
            const subscribers = post.subscribers;
            if (subscribers.indexOf(userId) === -1) {
                await this.postModel.findByIdAndUpdate(postId, { subscribers }).exec();
                return await this.postModel.findById(postId);
            }
            else {
                return post;
            }
        }
        else {
            throw new exceptions_1.Exceptions.RecordNotFoundException();
        }
    }
    async subscribeToUser(userId, subscribee) {
        const user = await this.userModel.findById(subscribee).exec();
        if (!user) {
            throw new exceptions_1.Exceptions.RecordNotFoundException();
        }
        const subscribers = user.subscribers;
        if (subscribers.indexOf(userId) === -1) {
            await this.userModel.findByIdAndUpdate(subscribee, { subscribers }).exec();
        }
        await this.postModel.updateMany({ createdBy: subscribee }, { subscribersFromCreator: subscribers });
        return { message: 'Success' };
    }
};
PostsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_2.InjectModel)(post_schema_1.Post.name)),
    __param(1, (0, mongoose_2.InjectModel)(user_schema_1.User.name)),
    __metadata("design:paramtypes", [mongoose_1.Model,
        mongoose_1.Model])
], PostsService);
exports.PostsService = PostsService;
//# sourceMappingURL=posts.service.js.map