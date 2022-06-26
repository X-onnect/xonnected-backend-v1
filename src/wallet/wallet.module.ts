import { Module } from '@nestjs/common';
import { WalletService } from './wallet.service';
import { WalletController } from './wallet.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { WalletSchema, Wallet } from 'src/schema/wallet.schema';

@Module({
  providers: [WalletService],
  controllers: [WalletController],
  imports: [MongooseModule.forFeature([{ name: Wallet.name, schema: WalletSchema }])],
})
export class WalletModule {}
