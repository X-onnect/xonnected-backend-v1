import * as mongoose from 'mongoose';
export declare type WalletDocument = Wallet & mongoose.Document;
export declare class Wallet {
    type: string;
    balance: string;
    createdAt: string;
}
export declare const WalletSchema: mongoose.Schema<any, mongoose.Model<any, any, any, any, any>, {}, {}, any, {}, "type", {
    type?: string;
    balance?: string;
    createdAt?: string;
}>;
export declare const walletBoilerplate: Wallet;
