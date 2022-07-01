import { Injectable } from '@nestjs/common';
import { Exceptions } from 'src/utils/exceptions';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import  { User, UserDocument, userDTO } from '../schema/user.schema'; 
import { Wallet2, Wallet2Document } from 'src/schema/wallet-2.schema';
import { objectsHaveTheSameKeys } from 'src/utils/objectsHaveTheSameKeys';

@Injectable()
export class UsersService {
    constructor(
        @InjectModel(User.name) private userModel: Model<UserDocument>,
        @InjectModel(Wallet2.name) private wallet2Model: Model<Wallet2Document>,
    ) {}

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
        const isUserObjectComplete = objectsHaveTheSameKeys(userDTO, user);

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

        const savedCreatedUser = await createdUser.save()

        if (savedCreatedUser) {
            const createdWallet = new this.wallet2Model({
                _id: savedCreatedUser._id,
                address: '',
                token: '',
                createdAt: savedCreatedUser.createdAt,
            });

            await createdWallet.save();
        }

        return savedCreatedUser;
    }

    async update(id: string, username: string, email: string, password: string): Promise<UserDocument> {
        return this.userModel.findByIdAndUpdate(id, { username, email, password })
    }

    async deleteUser(id: string) {
        return this.userModel.deleteOne({ _id: id });
    }
}
