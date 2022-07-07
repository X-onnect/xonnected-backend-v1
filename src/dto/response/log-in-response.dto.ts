import { ApiProperty } from '@nestjs/swagger';

export class LogInResponseDto {
    @ApiProperty()
    access_token: string;
}