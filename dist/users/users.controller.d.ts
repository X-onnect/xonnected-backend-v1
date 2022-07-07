import { UsersService } from './users.service';
export declare class UsersController {
    private usersService;
    constructor(usersService: UsersService);
    getUser(params: any): Promise<import("../schema/user.schema").User>;
    getAll(): Promise<import("../schema/user.schema").User[]>;
    update(body: any, req: any): Promise<import("../schema/user.schema").UserDocument>;
    deleteUser(body: any): Promise<{
        message: string;
    }>;
}
