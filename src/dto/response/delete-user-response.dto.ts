import { ApiProperty } from '@nestjs/swagger';

export class DeleteUserResponseDto {
    @ApiProperty()
    message: 'Success' | 'No match found';
}
