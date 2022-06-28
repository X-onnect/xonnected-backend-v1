import { Prop, Schema, SchemaFactory,  } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';


export type PostDocument = Post & mongoose.Document;


@Schema()
export class Post {
  @Prop({ required: true })
  text: string;

  @Prop({ required: false })
  image: string;

  @Prop({ required: true })
  likes: mongoose.Types.ObjectId[];

  @Prop({ required: true })
  createdAt: string;

  @Prop({ required: true })
  createdBy: mongoose.Types.ObjectId;

  @Prop({ required: true })
  comments: Post[];

  @Prop({ required: true })
  isFree: boolean;

  @Prop({ required: true })
  price: number;

  @Prop({ required: true })
  subscribers: mongoose.Types.ObjectId[];
}

export const PostSchema = SchemaFactory.createForClass(Post);

export const PostDTO = {
    text: " ",
    image: '',
    isFree: true,
    price: 0,
}
