import { Prop, Schema, SchemaFactory  } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';

export type UserDocument = User & mongoose.Document;

interface IdObject {
  _id: string,
}

@Schema()
export class User {
  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  username: string;

  @Prop({ required: true })
  password: string;

  @Prop({ require: true })
  createdAt: string;

  @Prop({ require: true })
  subscribers: IdObject[]

  @Prop({ require: true })
  subscribedTo: IdObject[]
}

export const UserSchema = SchemaFactory.createForClass(User);

export const userDTO = {
    email: " ",
    username: " ",
    password: " ",
}
