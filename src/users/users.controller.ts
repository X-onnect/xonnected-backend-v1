import { Controller, Get, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('user')
export class UsersController {
    constructor(private usersService: UsersService) {}

    @Get()
    async getAll() {
        return await this.usersService.findAll()
    }
}
