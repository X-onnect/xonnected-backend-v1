import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { PassportModule } from '@nestjs/passport';
import { UsersController } from './users.controller';
import { UserSchema, User } from 'src/schema/user.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { Wallet2Service } from 'src/wallet-2/wallet-2.service';
import { Wallet2Module } from 'src/wallet-2/wallet-2.module';

@Module({
  providers: [
    UsersService, 
  ],
  imports: [
    PassportModule, 
    Wallet2Module,
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
    ])
  ],
  exports: [UsersService],
  controllers: [UsersController]
})
export class UsersModule {}
