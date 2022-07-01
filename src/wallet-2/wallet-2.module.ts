import { Module } from '@nestjs/common';
import { Wallet2Service } from './wallet-2.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Wallet2Schema, Wallet2 } from 'src/schema/wallet-2.schema';

@Module({
  providers: [Wallet2Service],
  imports: [MongooseModule.forFeature([{ name: Wallet2.name, schema: Wallet2Schema }])],
  exports: [Wallet2Service]
})
export class Wallet2Module {}
