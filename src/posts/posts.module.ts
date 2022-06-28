import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { PostSchema, Post } from 'src/schema/post.schema';
import { UserSchema, User } from 'src/schema/user.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  providers: [PostsService],
  controllers: [PostsController],
  imports: [
    MongooseModule.forFeature([
      { name: Post.name, schema: PostSchema },
      { name: User.name, schema: UserSchema },
    ])
  ],
})
export class PostsModule {}
