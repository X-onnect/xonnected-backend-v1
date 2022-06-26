import { Controller, Get, Body, Post } from '@nestjs/common';
import { WalletService } from './wallet.service';
import { Public } from 'src/app.global';
import { Wallet } from 'src/schema/wallet.schema';


@Controller('wallet')
export class WalletController {
    constructor(private walletService: WalletService) {}

    @Public()
    @Get('balance')
    async getBalance(@Body() body: any) {
        const { _id } = body;
        return this.walletService.getBalance(_id);
    }

    @Post()
    async createWallet(@Body() body: Wallet) {
        return this.walletService.createWallet(body);
    }
}
