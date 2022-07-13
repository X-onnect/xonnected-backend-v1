/// <reference types="node" />
import { OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { Socket } from 'net';
import { Wallet2Service } from './wallet-2.service';
export declare class Wallet2Gateway implements OnGatewayConnection, OnGatewayDisconnect {
    private walletService;
    constructor(walletService: Wallet2Service);
    server: any;
    handleConnection(client: any, ...args: any[]): Promise<void>;
    handleDisconnect(client: any): Promise<void>;
    handleWalletConnection(client: Socket, req: any): Promise<void>;
    requestPayment(client: Socket, req: any, message: any): Promise<void>;
}
