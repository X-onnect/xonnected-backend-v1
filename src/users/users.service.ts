import { Injectable } from '@nestjs/common';
import { Exceptions } from 'src/utils/exceptions';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import  { User, UserDocument, userDTO } from '../schema/user.schema'; 
import { Wallet2, Wallet2Document } from 'src/schema/wallet-2.schema';
import { objectsHaveTheSameKeys } from 'src/utils/objectsHaveTheSameKeys';
import { Profile, ProfileDocument, ProfileDto } from 'src/schema/profile.schema';
import { UserDto } from 'src/dto/response/user.dto';

@Injectable()
export class UsersService {
    constructor(
        @InjectModel(User.name) private userModel: Model<UserDocument>,
        @InjectModel(Wallet2.name) private wallet2Model: Model<Wallet2Document>,
        @InjectModel(Profile.name) private profileModel: Model<ProfileDocument>,
    ) {}

    async findOne(email: string): Promise<User | undefined> {
        return this.userModel.findOne({ email }).exec()
    }

    async createUserProfile(_id: string): Promise<ProfileDocument> {
        const newProfile = new this.profileModel({
            image: '',
            displayName: '',
            subscriptionPrice: 0,
            _id,
        });

        return await newProfile.save();
    }

    async findUserById(_id: string): Promise<UserDto | undefined> {
        const user = await this.userModel.findById(_id).exec();

        if (!user) throw new Exceptions.RecordNotFoundException();

        let savedProfile: any = await this.profileModel.findById(_id).exec();

        if (!savedProfile) {
            savedProfile = await this.createUserProfile(_id);
        }

        const profile = {
            image: savedProfile.image,
            displayName: savedProfile.displayName,
            subscriptionPrice: savedProfile.subscriptionPrice,
        }

        const userBundled = {
            _id,
            email: user.email,
            username: user.username,
            createdAt: user.createdAt,
            subscribers: user.subscribers,
            subscribedTo: user.subscribedTo,
            profile,
        }

        return userBundled ;
    }

    async findAll(): Promise<User[]> {
        return this.userModel.find({}, "-password").exec()
    }

    async createUser(user: typeof userDTO): Promise<UserDto> {
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

        const createdWallet = new this.wallet2Model({
            _id: savedCreatedUser._id,
            address: '',
            token: '',
            createdAt: savedCreatedUser.createdAt,
        });

        await createdWallet.save();

        const savedProfile = await this.createUserProfile(savedCreatedUser._id);

        const profile = {
            image: savedProfile.image,
            displayName: savedProfile.displayName,
            subscriptionPrice: savedProfile.subscriptionPrice,
        }

        const userBundled: UserDto = {
            _id: savedCreatedUser._id,
            email: savedCreatedUser.email,
            username: savedCreatedUser.username,
            createdAt: savedCreatedUser.createdAt,
            subscribers: savedCreatedUser.subscribers,
            subscribedTo: savedCreatedUser.subscribedTo,
            profile,
        }

        return userBundled;
    }

    async update(id: string, username: string, email: string, password: string): Promise<UserDocument> {
        return this.userModel.findByIdAndUpdate(id, { username, email, password })
    }

    async updateProfile(profile: ProfileDto, userId: string) {
        try {
            const update =  await this.profileModel.findByIdAndUpdate(userId, profile, { new: true });
            
            if (!update) throw new Exceptions.RecordNotFoundException();
            
            return update;
        }
        catch (e) {
            throw new Exceptions.RecordNotFoundException();
        }
        
    }

    async deleteUser(id: string) {
        await this.wallet2Model.deleteOne({ _id: id });
        await this.profileModel.deleteOne({ _id: id });
        return this.userModel.deleteOne({ _id: id });
    }
}
