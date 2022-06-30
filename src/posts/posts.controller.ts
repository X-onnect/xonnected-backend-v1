import { Controller, Post, Get, Put, Delete, Request, Body, Param } from '@nestjs/common';
import { PostsService } from './posts.service';

@Controller('post')
export class PostsController {
    constructor(private postsService: PostsService) {}

    @Post()
    async createPost(@Request() req, @Body() body) {
        const { _id } = req.user;
        return this.postsService.createPost(body, _id);
    }

    @Delete(':id')
    async deletePost(@Request() req, @Param() param) {
        const { id } = param;
        const userId = req.user._id;
        return await this.postsService.deletePost(id, userId);
    }

    @Put(':id')
    async updatePost(@Body() body, @Param() param, @Request() req) {
        const { id } = param;
        const userId = req.user._id;
        const response = await this.postsService.updatePost(body, id, userId);

        return { message: 'success', data: response }
    }

    @Get('id/:id')
    async getPost(@Param() param, @Request() req) {
        const { id } = param;
        const userId = req.user._id;

        return await this.postsService.getPostById(id, userId)
    }

    @Get('all')
    async getAllPosts(@Request() req) {
        const { _id } = req.user;

        return await this.postsService.getAllPosts(_id);
    }
}
