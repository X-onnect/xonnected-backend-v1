import { WalletService } from './wallet.service';
import { Wallet } from 'src/schema/wallet.schema';
export declare class WalletController {
    private walletService;
    constructor(walletService: WalletService);
    getBalance(body: any): Promise<{
        balance: string;
    }>;
    createWallet(body: Wallet): Promise<import("src/schema/wallet.schema").WalletDocument>;
}
