import { AuthService } from './auth.service';
import { UsersService } from 'src/users/users.service';
import { LogInDto } from 'src/dto/log-in.dto';
import { UserDto } from 'src/dto/response/user.dto';
export declare class AuthController {
    private authService;
    private userService;
    constructor(authService: AuthService, userService: UsersService);
    login(req: any, body: LogInDto): Promise<{
        access_token: string;
    }>;
    getUser(req: any): Promise<any>;
    signup(body: any): Promise<UserDto>;
}
