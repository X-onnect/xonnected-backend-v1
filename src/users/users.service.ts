import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import  { User, UserDocument } from '../schema/user.schema'; 

@Injectable()
export class UsersService {
    constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

    async findOne(email: string): Promise<User | undefined> {
        return this.userModel.findOne({ email }).exec()
    }

    async findAll(): Promise<User[]> {
        console.log(User.name)
        return this.userModel.find().exec()
    }

    async createUser(user: User): Promise<UserDocument> {
        const createdUser = new this.userModel(user);
        return createdUser.save();
    }

    async update(id: string, username: string, email: string, password: string): Promise<UserDocument> {
        return this.userModel.findByIdAndUpdate(id, { username, email, password })
    }

    async delete(id: string) {
        return this.userModel.deleteOne({ _id: id });
    }
}
