import { Prop, Schema, SchemaFactory  } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';

export type UserDocument = User & mongoose.Document;

export interface IdObject {
  _id: mongoose.Types.ObjectId,
}

@Schema()
export class User {
  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  username: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true })
  createdAt: string;

  @Prop({ required: true })
  subscribers: mongoose.Types.ObjectId[]

  @Prop({ required: true })
  subscribedTo: mongoose.Types.ObjectId[]
}

export const UserSchema = SchemaFactory.createForClass(User);

export const userDTO = {
    email: " ",
    username: " ",
    password: " ",
}
