import { Controller, Request, Post, UseGuards, Get, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local-auth.guard';
import { JwtAuthGuard } from './jwt-auth.guard';
import { UsersService } from 'src/users/users.service';
import { Public } from 'src/app.global';

@Controller('auth')
export class AuthController {
    constructor (private authService: AuthService, private userService: UsersService) {}

    @Public()
    @UseGuards(LocalAuthGuard)
    @Post('login')
    async login(@Request() req) {
        return this.authService.login(req.user)
    }

    @UseGuards(JwtAuthGuard)
    @Get('user')
    async getUser(@Request() req) {
        return req.user
    }

    @Public()
    //@UseGuards(LocalAuthGuard)
    @Post('signup')
    async signup(@Body() body) {
        return this.userService.createUser(body);
    }
}
