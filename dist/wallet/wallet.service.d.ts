import { Wallet, WalletDocument } from 'src/schema/wallet.schema';
import { Model } from 'mongoose';
export declare class WalletService {
    private walletModel;
    constructor(walletModel: Model<WalletDocument>);
    getBalance(_id: string): Promise<{
        balance: string;
    }>;
    createWallet(wallet: Wallet): Promise<WalletDocument>;
}
