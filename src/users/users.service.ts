import { Injectable } from '@nestjs/common';
import { Exceptions } from 'src/utils/exceptions';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import  { User, UserDocument, userDTO } from '../schema/user.schema'; 

@Injectable()
export class UsersService {
    constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

    async findOne(email: string): Promise<User | undefined> {
        return this.userModel.findOne({ email }).exec()
    }

    async findUserById(_id: string): Promise<User | undefined> {
        return this.userModel.findOne({ _id }).exec();
    }

    async findAll(): Promise<User[]> {
        return this.userModel.find({}, "-password").exec()
    }

    async createUser(user: typeof userDTO): Promise<UserDocument> {
        let isUserObjectComplete = true;

        Object.keys(userDTO).every(key => {
            if (user[key]) return true
            else {
                isUserObjectComplete = false;
                return false;
            }
        });

        if (!isUserObjectComplete) {
            throw new Exceptions.IncompleteRequestException();
        }

        const existingUsername = await this.userModel.findOne({ username: user.username }).exec();

        if (existingUsername) throw new Exceptions.UsernameExistsException();

        const existingEmail = await this.userModel.findOne({ email: user.email }).exec();

        if (existingEmail) {
            throw new Exceptions.EmailExistsException();
        }

        const createdUser = new this.userModel({
            ...user,
            createdAt: new Date().toISOString(),
        });

        return await createdUser.save();
    }

    async update(id: string, username: string, email: string, password: string): Promise<UserDocument> {
        return this.userModel.findByIdAndUpdate(id, { username, email, password })
    }

    async delete(id: string) {
        return this.userModel.deleteOne({ _id: id });
    }
}
