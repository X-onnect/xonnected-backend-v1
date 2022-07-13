import { Prop, Schema, SchemaFactory  } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { IsString, IsNumber, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export type ProfileDocument = Profile & mongoose.Document;

export interface IdObject {
  _id: mongoose.Types.ObjectId,
}

@Schema()
export class Profile {
  @Prop({ required: false })
  image: string;

  @Prop({ required: false })
  displayName: string;

  @Prop({ required: true })
  subscriptionPrice: number;
}

export class ProfileDto {
    @ApiProperty()
    @IsOptional()
    @IsString()
    image: string;

    @ApiProperty()
    @IsOptional()
    @IsString()
    displayName: string;

    @ApiProperty()
    @IsOptional()
    @IsNumber()
    subscriptionPrice: number;
}

export const ProfileSchema = SchemaFactory.createForClass(Profile);
