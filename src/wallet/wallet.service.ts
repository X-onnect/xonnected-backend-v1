import { HttpStatus, Injectable } from '@nestjs/common';
import { Wallet, WalletDocument, walletBoilerplate } from 'src/schema/wallet.schema';
import { InjectModel } from '@nestjs/mongoose';
import { HttpCode, HttpException } from '@nestjs/common';
import { Model } from 'mongoose';


@Injectable()
export class WalletService {
    constructor(@InjectModel(Wallet.name) private walletModel: Model<WalletDocument>) {}
    
    async getBalance(_id: string) {
        const wallet = await this.walletModel.findOne({ _id }).exec();

        if (wallet) {
            return  { balance: wallet.balance };
        }
        else {
            throw new HttpException({
                status: HttpStatus.BAD_REQUEST,
                message: 'Wallet does not exist for this user.'
            }, HttpStatus.BAD_REQUEST);
        }
    }

    async createWallet(wallet: Wallet) {
        let isValidWalletObject = true;
        console.log(Object.keys(walletBoilerplate))

        Object.keys(walletBoilerplate).every(key => {
            console.log(key)
            if (wallet[key]) return true;
            else {
                isValidWalletObject = false;
                return false;
            }
        });

        if (!isValidWalletObject) {
            throw new HttpException({
                status: HttpStatus.BAD_REQUEST,
                message: 'Invalid object in body of request.'
            }, HttpStatus.BAD_REQUEST)
        }

        const walletObject = new this.walletModel(wallet);

        return walletObject.save();
    }

}
