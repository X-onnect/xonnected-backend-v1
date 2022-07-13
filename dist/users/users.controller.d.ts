import { UsersService } from './users.service';
import { UserDto } from 'src/dto/response/user.dto';
import { ProfileDto } from 'src/schema/profile.schema';
export declare class UsersController {
    private usersService;
    constructor(usersService: UsersService);
    getUser(params: any): Promise<UserDto>;
    getAll(): Promise<import("../schema/user.schema").User[]>;
    update(body: any, req: any): Promise<import("../schema/user.schema").UserDocument>;
    deleteUser(body: any): Promise<{
        message: string;
    }>;
    updateProfile(body: ProfileDto, req: any): Promise<import("src/schema/profile.schema").Profile & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }>;
}
