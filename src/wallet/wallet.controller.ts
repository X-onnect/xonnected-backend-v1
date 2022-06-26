import { Controller, Get } from '@nestjs/common';
import { WalletService } from './wallet.service';
import { Public } from 'src/app.global';

@Controller('wallet')
export class WalletController {
    constructor(private walletService: WalletService) {}

    @Public()
    @Get('balance')
    async getBalance() {
        return this.walletService.getBalance();
    }
}
