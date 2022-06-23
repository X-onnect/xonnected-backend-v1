import { UsersService } from '../users/users.service';
import { User } from 'src/users/users.interface';
import { JwtService } from '@nestjs/jwt';
export declare class AuthService {
    private usersService;
    private jwtService;
    constructor(usersService: UsersService, jwtService: JwtService);
    validateUser(email: string, password: string): Promise<any>;
    login(user: User): Promise<{
        access_token: string;
    }>;
}
