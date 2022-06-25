import { Injectable } from '@nestjs/common';

@Injectable()
export class WalletService {
    async getBalance() {
        return '234 XRP';
    }
}
