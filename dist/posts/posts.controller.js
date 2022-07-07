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
exports.PostsController = void 0;
const common_1 = require("@nestjs/common");
const posts_service_1 = require("./posts.service");
const swagger_1 = require("@nestjs/swagger");
const create_post_dto_1 = require("../dto/create-post.dto");
const post_dto_1 = require("../dto/response/post.dto");
const delete_user_response_dto_1 = require("../dto/response/delete-user-response.dto");
const edit_post_dto_1 = require("../dto/edit-post.dto");
let PostsController = class PostsController {
    constructor(postsService) {
        this.postsService = postsService;
    }
    async createPost(req, body) {
        const { _id } = req.user;
        return await this.postsService.createPost(body, _id);
    }
    async deletePost(req, param) {
        const { id } = param;
        const userId = req.user._id;
        const response = await this.postsService.deletePost(id, userId);
        if (response.acknowledged && response.deletedCount > 0) {
            return { message: 'Success' };
        }
        else {
            return { message: 'No match found' };
        }
    }
    async updatePost(body, param, req) {
        const { id } = param;
        const userId = req.user._id;
        const response = await this.postsService.updatePost(body, id, userId);
        return { message: 'success', data: response };
    }
    async getPost(param, req) {
        const { id } = param;
        const userId = req.user._id;
        return await this.postsService.getPostById(id, userId);
    }
    async getAllPosts(req) {
        const { _id } = req.user;
        return await this.postsService.getAllPosts(_id);
    }
    async subscribeToPost(req, param) {
        const { id } = param;
        const userId = req.user._id;
        return await this.postsService.subscribeToPost(userId, id);
    }
    async subscribeToUser(req, param) {
        const { id } = param;
        const userId = req.user._id;
        return await this.postsService.subscribeToUser(userId, id);
    }
    async likePost(request, param) {
        var _a;
        const { id } = param;
        const userId = (_a = request.user) === null || _a === void 0 ? void 0 : _a._id;
        return await this.postsService.likePost(id, userId);
    }
    async dislikePost(request, param) {
        var _a;
        const { id } = param;
        const userId = (_a = request.user) === null || _a === void 0 ? void 0 : _a._id;
        return await this.postsService.unlikePost(id, userId);
    }
};
__decorate([
    (0, swagger_1.ApiBearerAuth)("Bearer"),
    (0, swagger_1.ApiOperation)({ summary: 'Creates a new post for a user' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Post created successfully',
        type: post_dto_1.PostDto,
    }),
    (0, swagger_1.ApiBody)({ type: create_post_dto_1.CreatePostDto }),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], PostsController.prototype, "createPost", null);
__decorate([
    (0, swagger_1.ApiBearerAuth)("Bearer"),
    (0, swagger_1.ApiOperation)({ summary: `Deletes a user's post` }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Post deleted successfully',
        type: delete_user_response_dto_1.DeleteUserResponseDto,
    }),
    (0, swagger_1.ApiParam)({ description: 'id of the post to be deleted', name: 'id' }),
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], PostsController.prototype, "deletePost", null);
__decorate([
    (0, swagger_1.ApiBearerAuth)("Bearer"),
    (0, swagger_1.ApiOperation)({ summary: `Updates a user's post matching the given id.` }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Post updated successfully',
        type: post_dto_1.PostDto,
    }),
    (0, swagger_1.ApiParam)({ description: 'id of the post to be updated.', name: 'id' }),
    (0, swagger_1.ApiBody)({ type: edit_post_dto_1.EditPostDto }),
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Param)()),
    __param(2, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", Promise)
], PostsController.prototype, "updatePost", null);
__decorate([
    (0, swagger_1.ApiBearerAuth)("Bearer"),
    (0, swagger_1.ApiOperation)({ summary: `Gets a post matching the given id.` }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Post retrieved.',
        type: post_dto_1.PostDto,
    }),
    (0, swagger_1.ApiParam)({ description: 'id of the post to be retrieved.', name: 'id' }),
    (0, common_1.Get)('id/:id'),
    __param(0, (0, common_1.Param)()),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], PostsController.prototype, "getPost", null);
__decorate([
    (0, swagger_1.ApiBearerAuth)("Bearer"),
    (0, swagger_1.ApiOperation)({ summary: `Gets all posts.` }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        isArray: true,
        description: 'All posts retrieved.',
        type: post_dto_1.PostDto,
    }),
    (0, common_1.Get)('all'),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], PostsController.prototype, "getAllPosts", null);
__decorate([
    (0, swagger_1.ApiBearerAuth)("Bearer"),
    (0, swagger_1.ApiOperation)({ summary: `Subscribe to post with given id.` }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Subscription complete.',
        type: post_dto_1.PostDto,
    }),
    (0, swagger_1.ApiParam)({ description: 'id of the post to subscribe to.', name: 'id' }),
    (0, common_1.Get)('subscribe-to-post/:id'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], PostsController.prototype, "subscribeToPost", null);
__decorate([
    (0, swagger_1.ApiBearerAuth)("Bearer"),
    (0, swagger_1.ApiOperation)({ summary: `Subscribe to user with given id.` }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Subscription complete.',
        type: delete_user_response_dto_1.DeleteUserResponseDto,
    }),
    (0, swagger_1.ApiParam)({ description: 'id of the user to subscribe to.', name: 'id' }),
    (0, common_1.Get)('subscribe-to-user/:id'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], PostsController.prototype, "subscribeToUser", null);
__decorate([
    (0, swagger_1.ApiBearerAuth)("Bearer"),
    (0, swagger_1.ApiOperation)({ summary: `Like post with given id.` }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Post liked successfully.',
        type: post_dto_1.PostDto,
    }),
    (0, swagger_1.ApiParam)({ description: 'id of the post to like.', name: 'id' }),
    (0, common_1.Get)('like/:id'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], PostsController.prototype, "likePost", null);
__decorate([
    (0, swagger_1.ApiBearerAuth)("Bearer"),
    (0, swagger_1.ApiOperation)({ summary: `Unlike post with given id.` }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Post unliked successfully.',
        type: post_dto_1.PostDto,
    }),
    (0, swagger_1.ApiParam)({ description: 'id of the post to unlike.', name: 'id' }),
    (0, common_1.Get)('dislike/:id'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], PostsController.prototype, "dislikePost", null);
PostsController = __decorate([
    (0, swagger_1.ApiTags)("Post Management"),
    (0, common_1.Controller)('post'),
    __metadata("design:paramtypes", [posts_service_1.PostsService])
], PostsController);
exports.PostsController = PostsController;
//# sourceMappingURL=posts.controller.js.map