import { IsNotEmpty, IsString, IsBoolean } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class PostDto {
    @ApiProperty()
    text: string;

    @ApiProperty()
    image: string;

    @ApiProperty()
    likes: string[];

    @ApiProperty()
    createdAt: string;

    @ApiProperty()
    createdBy: string;

    @ApiProperty()
    comments: PostDto[];

    @ApiProperty()
    isFree: boolean;

    @ApiProperty()
    price: number;

    @ApiProperty()
    subscribersFromCreator: string[];

    @ApiProperty()
    subscribers: string[];
}
