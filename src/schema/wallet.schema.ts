import { Prop, Schema  } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';

export type WalletDocument = Wallet & mongoose.Document;

@Schema()
export class Wallet {
  @Prop({ required: true })
  type: string;

  @Prop({ required: true })
  balance: string;

  @Prop({ required: true })
  createdAt: string;
}


export const WalletSchema = new mongoose.Schema({
    type: String,
    balance: String,
    createdAt: String,
})

export const walletBoilerplate: Wallet = {
    type: ' ',
    balance: ' ',
    createdAt: ' ',
}
