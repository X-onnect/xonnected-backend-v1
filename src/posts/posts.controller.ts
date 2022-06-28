import { Controller, Post, Get, Put, Delete, Request, Body } from '@nestjs/common';
import { PostsService } from './posts.service';

@Controller('posts')
export class PostsController {
    constructor(private postsService: PostsService) {}

    @Post()
    async createPost(@Request() req, @Body() body) {
        const { _id } = req.user;
        return this.postsService.createPost(body, _id);
    }
}
