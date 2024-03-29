import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService
    ) {}

    async validateUser(email: string, password: string): Promise<any> {
        const user = await this.usersService.findOne(email);

        if (user && user.password === password) return user;
        else return null;
    }

    async login(user: any) {
        const payload = { id: user._id, sub: user };

        return { access_token: this.jwtService.sign(payload) }
    }
}
