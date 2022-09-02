import { IsNotEmpty, IsString, IsBoolean, IsInt } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class EditPostDto {
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    text: string;
}
