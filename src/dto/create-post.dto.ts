import { IsNotEmpty, IsString, IsBoolean, IsInt } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreatePostDto {
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    text: string;

    @ApiProperty()
    @IsString()
    image: string;

    @ApiProperty()
    @IsBoolean()
    isFree: boolean;

    @ApiProperty()
    @IsNotEmpty()
    @IsInt()
    price: number;
}
