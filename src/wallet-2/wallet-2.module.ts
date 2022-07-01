import { Module } from '@nestjs/common';
import { Wallet2Service } from './wallet-2.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Wallet2Schema, Wallet2 } from 'src/schema/wallet-2.schema';
import { Wallet2Gateway } from './wallet-2.gateway';
import { UsersModule } from 'src/users/users.module';
import { JwtStrategy } from 'src/auth/jwt.strategy';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from 'src/auth/constants';

@Module({
  providers: [Wallet2Service, Wallet2Gateway, JwtStrategy],
  imports: [
    MongooseModule.forFeature([{ name: Wallet2.name, schema: Wallet2Schema }]),
    UsersModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '86400s' }
    })
  ],
  exports: [Wallet2Service]
})
export class Wallet2Module {}
