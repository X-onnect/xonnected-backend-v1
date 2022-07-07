import { Controller, Get, Put, Body, Delete, Request, Param } from '@nestjs/common';
import { UsersService } from './users.service';
import {
    ApiBearerAuth,
    ApiOperation,
    ApiResponse,
    ApiTags,
    ApiBody,
    ApiParam,
  } from '@nestjs/swagger';
import { UserDto } from 'src/dto/response/user.dto';
import { SignUpDto } from 'src/dto/sign-up.dto';
import { DeleteUserDto } from 'src/dto/delete-user.dto';
import { DeleteUserResponseDto } from 'src/dto/response/delete-user-response.dto';

@ApiTags("User management")
@Controller('user')
export class UsersController {
    constructor(private usersService: UsersService) {}

    @ApiBearerAuth("Bearer")
    @ApiOperation({ summary: 'Gets data of user matching given id.' })
    @ApiResponse({ 
        status: 200,
        description: 'success',
        type: UserDto
    })
    @ApiParam({ description: 'id of the post to be retrieved.', name: 'id' })
    @Get(":id")
    async getUser(@Param() params) {
        const { id } = params;

        return await this.usersService.findUserById(id);
    }

    @ApiBearerAuth("Bearer")
    @ApiOperation({ summary: 'Gets data of all users.' })
    @ApiResponse({ 
        status: 200,
        description: 'success',
        isArray: true,
        type: UserDto
    })
    @Get('all')
    async getAll() {
        return await this.usersService.findAll()
    }

    @ApiBearerAuth("Bearer")
    @ApiOperation({ summary: `Updates a user's sign-in information.` })
    @ApiResponse({ 
        status: 200,  
        description: 'success',
        type: UserDto
    })
    @ApiBody({ type: SignUpDto })
    @Put()
    async update(@Body() body, @Request() req) {
        const { _id } = req.user;
        const { username, password, email } = body;
        return await this.usersService.update(_id, username, email, password);
    }

    @ApiBearerAuth("Bearer")
    @ApiOperation({ summary: `Deletes all data related to a user.` })
    @ApiResponse({ 
        status: 200,  
        description: 'success',
        type: DeleteUserResponseDto,
    })
    @ApiBody({ type: DeleteUserDto })
    @Delete()
    async deleteUser(@Body() body) {
        const { _id } = body;
        const response = await this.usersService.deleteUser(_id);

        if (response.acknowledged && response.deletedCount > 0) {
            return { message: 'Success' }
        }
        else {
            return { message: 'No match found' }
        }
    }
}
