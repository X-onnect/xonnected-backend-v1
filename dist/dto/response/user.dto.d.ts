import { ProfileDto } from 'src/schema/profile.schema';
export declare class UserDto {
    _id: string;
    email: string;
    username: string;
    createdAt: string;
    subscribers: string[];
    subscribedTo: string[];
    profile: ProfileDto;
}
