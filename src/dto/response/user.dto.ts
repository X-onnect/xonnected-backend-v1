import { IsNotEmpty, IsString, IsOptional, IsBoolean } from 'class-validator';
import { ProfileDto } from 'src/schema/profile.schema';
import { ApiProperty } from '@nestjs/swagger';


export class UserDto {
    @ApiProperty()
    _id: string;

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

    @ApiProperty()
    profile: ProfileDto
}
