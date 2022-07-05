import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { PassportModule } from '@nestjs/passport';
import { UsersController } from './users.controller';
import { UserSchema, User } from 'src/schema/user.schema';
import { Wallet2Schema, Wallet2 } from 'src/schema/wallet-2.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  providers: [
    UsersService, 
  ],
  imports: [
    PassportModule, 
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: Wallet2.name, schema: Wallet2Schema }
    ])
  ],
  exports: [UsersService],
  controllers: [UsersController]
})
export class UsersModule {}
