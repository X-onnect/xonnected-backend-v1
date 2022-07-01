import { Wallet2Document } from 'src/schema/wallet-2.schema';
import { Model } from 'mongoose';
export declare class Wallet2Service {
    private wallet2Model;
    constructor(wallet2Model: Model<Wallet2Document>);
    connectToWallet(): Promise<void>;
}
