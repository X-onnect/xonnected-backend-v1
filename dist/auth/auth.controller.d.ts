import { AuthService } from './auth.service';
import { UsersService } from 'src/users/users.service';
export declare class AuthController {
    private authService;
    private userService;
    constructor(authService: AuthService, userService: UsersService);
    login(req: any): Promise<{
        access_token: string;
    }>;
    getUser(req: any): Promise<any>;
    signup(body: any): Promise<import("../schema/user.schema").UserDocument>;
}
