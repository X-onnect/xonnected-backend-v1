import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { PassportModule } from '@nestjs/passport';
import { UsersController } from './users.controller';

@Module({
  providers: [
    UsersService, 
  ],
  imports: [PassportModule,],
  exports: [UsersService],
  controllers: [UsersController]
})
export class UsersModule {}
