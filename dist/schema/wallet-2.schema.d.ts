import * as mongoose from 'mongoose';
export declare type Wallet2Document = Wallet2 & mongoose.Document;
export declare class Wallet2 {
    address: string;
    token: string;
    createdAt: string;
}
export declare const Wallet2Schema: mongoose.Schema<Wallet2, mongoose.Model<Wallet2, any, any, any, any>, {}, {}, any, {}, "type", Wallet2>;
