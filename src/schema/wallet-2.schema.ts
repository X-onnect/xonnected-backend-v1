import { Prop, Schema, SchemaFactory  } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';

export type Wallet2Document = Wallet2 & mongoose.Document;

@Schema()
export class Wallet2 {
  @Prop({ required: false })
  address: string

  @Prop({ required: false })
  token: string

  @Prop({ required: true })
  createdAt: string;
}

export const Wallet2Schema = SchemaFactory.createForClass(Wallet2);

