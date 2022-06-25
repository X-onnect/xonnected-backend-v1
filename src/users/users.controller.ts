import { Controller, Get, Put, Body, Delete } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('user')
export class UsersController {
    constructor(private usersService: UsersService) {}

    @Get('all')
    async getAll() {
        return await this.usersService.findAll()
    }

    @Put()
    async update(@Body() body) {
        const { _id, username, password, email } = body;
        return await this.usersService.update(_id, username, email, password);
    }

    @Delete()
    async deleteUser(@Body() body) {
        const { _id } = body;
        const response = await this.usersService.delete(_id);

        if (response.acknowledged && response.deletedCount > 0) {
            return { message: 'Success' }
        }
        else {
            return { message: 'No match found' }
        }
    }
}
