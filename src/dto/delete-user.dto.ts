import { ApiProperty } from '@nestjs/swagger';

export class DeleteUserDto {
    @ApiProperty()
    _id: string;
}
