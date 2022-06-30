import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { PassportModule } from '@nestjs/passport';
import { UsersController } from './users.controller';
import { UserSchema, User } from 'src/schema/user.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  providers: [
    UsersService, 
  ],
  imports: [
    PassportModule, 
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
    ])
  ],
  exports: [UsersService],
  controllers: [UsersController]
})
export class UsersModule {}
