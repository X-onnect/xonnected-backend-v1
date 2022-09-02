import { Controller, Request, Post, UseGuards, Get, Body } from '@nestjs/common';
import {
    ApiBearerAuth,
    ApiOperation,
    ApiResponse,
    ApiTags,
    ApiBody,
  } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local-auth.guard';
import { JwtAuthGuard } from './jwt-auth.guard';
import { UsersService } from 'src/users/users.service';
import { LogInResponseDto } from 'src/dto/response/log-in-response.dto';
import { LogInDto } from 'src/dto/log-in.dto';
import { UserDto } from 'src/dto/response/user.dto';
import { SignUpDto } from 'src/dto/sign-up.dto';
import { Public } from 'src/app.global';

interface LogIn {
    access_token: string,
}

@ApiTags("Authentication Manager")
@Controller('auth')
export class AuthController {
    constructor (private authService: AuthService, private userService: UsersService) {}

    @ApiOperation({ summary: `Handles a user's log in request.` })
    @ApiResponse({ 
        status: 200, 
        description: 'Object containing authentication header.', 
        type: LogInResponseDto,
    })
    @ApiBody({ type: LogInDto })
    @Public()
    @UseGuards(LocalAuthGuard)
    @Post('login')
    async login(@Request() req, @Body() body: LogInDto) {
        return this.authService.login(req.user)
    }

    @UseGuards(JwtAuthGuard)
    @ApiOperation({ summary: `Gets the data of the logged-in user.` })
    @ApiResponse({ 
        status: 200, 
        description: 'User object.', 
        type: UserDto,
    })
    @Get('user')
    async getUser(@Request() req) {
        return req.user
    }


    @Public()
    @ApiOperation({ summary: "Performs sign-up operation for a new user." })
    @ApiResponse({ 
        status: 200,  
        description: 'success',
        type: UserDto
    })
    @ApiBody({ type: SignUpDto })
    @Post('signup')
    async signup(@Body() body) {
        return this.userService.createUser(body);
    }
}
