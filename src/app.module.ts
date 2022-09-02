import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { UsersModule } from './users/users.module';
import { WalletModule } from './wallet/wallet.module';
import { MongooseModule } from '@nestjs/mongoose';
import { env } from 'src/utils/env';
import { PostsModule } from './posts/posts.module';
import { Wallet2Module } from './wallet-2/wallet-2.module';

@Module({
  imports: [AuthModule, UsersModule, WalletModule, MongooseModule.forRoot(env.MONGODB_URI), PostsModule, Wallet2Module],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard
    }
  ],
})
export class AppModule {}
