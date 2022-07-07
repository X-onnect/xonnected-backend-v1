import { IsNotEmpty, IsString, IsOptional, IsBoolean } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UserDto {
    @ApiProperty()
    email: string;

    @ApiProperty()
    username: string;

    @ApiProperty()
    createdAt: string;

    @ApiProperty()
    subscribers: string[]

    @ApiProperty()
    subscribedTo: string[]
}
