import { Controller, Post, Get, Put, Delete, Request, Body, Param } from '@nestjs/common';
import { PostsService } from './posts.service';
import {
    ApiBearerAuth,
    ApiOperation,
    ApiResponse,
    ApiTags,
    ApiBody,
    ApiParam,
} from '@nestjs/swagger';
import { CreatePostDto } from 'src/dto/create-post.dto';
import { PostDto } from 'src/dto/response/post.dto';
import { DeleteUserResponseDto } from 'src/dto/response/delete-user-response.dto';
import { SizeLimitInterceptor } from 'src/utils/interceptors/size-limit.interceptor';
import { UseInterceptors } from '@nestjs/common';
import { EditPostDto } from 'src/dto/edit-post.dto';

@ApiTags("Post Management")
@Controller('post')
export class PostsController {
    constructor(private postsService: PostsService) {}

    @ApiBearerAuth("Bearer")
    @ApiOperation({ summary: 'Creates a new post for a user' })
    @ApiResponse({
        status: 200,
        description: 'Post created successfully',
        type: PostDto,
    })
    @ApiBody({ type: CreatePostDto })
    @UseInterceptors(new SizeLimitInterceptor(1024 * 1024 * 5)) //5mb limit for image upload
    @Post()
    async createPost(@Request() req, @Body() body) {
        const { _id } = req.user;
        return await this.postsService.createPost(body, _id);
    }

    @ApiBearerAuth("Bearer")
    @ApiOperation({ summary: `Deletes a user's post` })
    @ApiResponse({
        status: 200,
        description: 'Post deleted successfully',
        type: DeleteUserResponseDto,
    })
    @ApiParam({ description: 'id of the post to be deleted', name: 'id' })
    @Delete(':id')
    async deletePost(@Request() req, @Param() param) {
        const { id } = param;
        const userId = req.user._id;
        const response = await this.postsService.deletePost(id, userId);

        if (response.acknowledged && response.deletedCount > 0) {
            return { message: 'Success' }
        }
        else {
            return { message: 'No match found' }
        }
    }

    @ApiBearerAuth("Bearer")
    @ApiOperation({ summary: `Updates a user's post matching the given id.` })
    @ApiResponse({
        status: 200,
        description: 'Post updated successfully',
        type: PostDto,
    })
    @ApiParam({ description: 'id of the post to be updated.', name: 'id' })
    @ApiBody({ type: EditPostDto })
    @Put(':id')
    async updatePost(@Body() body, @Param() param, @Request() req) {
        const { id } = param;
        const userId = req.user._id;
        const response = await this.postsService.updatePost(body, id, userId);

        return { message: 'success', data: response }
    }

    @ApiBearerAuth("Bearer")
    @ApiOperation({ summary: `Gets a post matching the given id.` })
    @ApiResponse({
        status: 200,
        description: 'Post retrieved.',
        type: PostDto,
    })
    @ApiParam({ description: 'id of the post to be retrieved.', name: 'id' })
    @Get('id/:id')
    async getPost(@Param() param, @Request() req) {
        const { id } = param;
        const userId = req.user._id;

        return await this.postsService.getPostById(id, userId)
    }

    @ApiBearerAuth("Bearer")
    @ApiOperation({ summary: `Gets all posts.` })
    @ApiResponse({
        status: 200,
        isArray: true,
        description: 'All posts retrieved.',
        type: PostDto,
    })
    @Get('all')
    async getAllPosts(@Request() req) {
        const { _id } = req.user;

        return await this.postsService.getAllPosts(_id);
    }

    @ApiBearerAuth("Bearer")
    @ApiOperation({ summary: `Subscribe to post with given id.` })
    @ApiResponse({
        status: 200,
        description: 'Subscription complete.',
        type: PostDto,
    })
    @ApiParam({ description: 'id of the post to subscribe to.', name: 'id' })
    @Get('subscribe-to-post/:id')
    async subscribeToPost(@Request() req, @Param() param) {
        const { id } = param;
        const userId = req.user._id;

        return await this.postsService.subscribeToPost(userId, id);
    }

    @ApiBearerAuth("Bearer")
    @ApiOperation({ summary: `Subscribe to user with given id.` })
    @ApiResponse({
        status: 200,
        description: 'Subscription complete.',
        type: DeleteUserResponseDto,
    })
    @ApiParam({ description: 'id of the user to subscribe to.', name: 'id' })
    @Get('subscribe-to-user/:id')
    async subscribeToUser(@Request() req, @Param() param) {
        const { id } = param;
        const userId = req.user._id;

        return await this.postsService.subscribeToUser(userId, id);
    }

    @ApiBearerAuth("Bearer")
    @ApiOperation({ summary: `Like post with given id.` })
    @ApiResponse({
        status: 200,
        description: 'Post liked successfully.',
        type: PostDto,
    })
    @ApiParam({ description: 'id of the post to like.', name: 'id' })
    @Get('like/:id')
    async likePost(@Request() request, @Param() param) {
        const { id } = param;
        const userId = request.user?._id;

        return await this.postsService.likePost(id, userId);
    }

    @ApiBearerAuth("Bearer")
    @ApiOperation({ summary: `Unlike post with given id.` })
    @ApiResponse({
        status: 200,
        description: 'Post unliked successfully.',
        type: PostDto,
    })
    @ApiParam({ description: 'id of the post to unlike.', name: 'id' })
    @Get('dislike/:id')
    async dislikePost(@Request() request, @Param() param) {
        const { id } = param;
        const userId = request.user?._id;

        return await this.postsService.unlikePost(id, userId);
    }

    @ApiBearerAuth("Bearer")
    @ApiOperation({ summary: 'Comments on a post.' })
    @ApiResponse({
        status: 200,
        description: 'Comment created successfully',
        type: PostDto,
    })
    @ApiBody({ type: CreatePostDto })
    @ApiParam({ description: 'id of the post to comment on.', name: 'id' })
    @UseInterceptors(new SizeLimitInterceptor(1024 * 1024 * 5)) //5mb limit for image upload
    @Post('comment/:id')
    async commentOnPost(@Request() req, @Body() body, @Param() param) {
        const { _id } = req.user;
        const postId = param.id;
        return await this.postsService.commentOnPost(postId, body, _id);
    }
}
