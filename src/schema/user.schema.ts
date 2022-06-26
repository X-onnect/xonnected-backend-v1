import { Prop, Schema  } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';

export type UserDocument = User & mongoose.Document;

@Schema()
export class User {
  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  username: string;

  @Prop({ required: true })
  password: string;
}


export const UserSchema = new mongoose.Schema({
    username: String,
    email: String,
    password: String,
})
