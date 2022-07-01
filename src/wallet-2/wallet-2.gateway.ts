import {
    WebSocketGateway,
    WebSocketServer,
    SubscribeMessage,
    OnGatewayConnection,
    OnGatewayDisconnect,
    MessageBody,
    ConnectedSocket,
    WsException
} from '@nestjs/websockets';
import { UseGuards, HttpStatus } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Request } from '@nestjs/common';
import { Socket } from 'net';
import { Wallet2Service } from './wallet-2.service';
import mongoose from 'mongoose';

interface paymentRequestObject {
    receiverId: string,
    amount: string,
}

@WebSocketGateway({
    cors: {
        origin: '*',
    },
})
export class Wallet2Gateway implements OnGatewayConnection, OnGatewayDisconnect{
    constructor(private walletService: Wallet2Service) {}

    @WebSocketServer() server;

    async handleConnection(client: any, ...args: any[]) {
        console.log("connection detected")
    }

    async handleDisconnect(client: any) {
        console.log("disconnection just happened")
    }

    @SubscribeMessage('connect-wallet')
    async handleWalletConnection(@ConnectedSocket() client: Socket, @Request() req) {
        const authHeader = req.handshake.headers.authorization;

        const validation = await this.walletService.validateConnection(authHeader);

        if (validation.isValid) {
            await this.walletService.connectToWallet(client, validation._id);
        }
        else {
            return;
        }
    }

    @SubscribeMessage('request-payment')
    async requestPayment(@ConnectedSocket() client: Socket, @Request() req, @MessageBody() message: any) {
        const authHeader = req.handshake.headers.authorization;

        let parsedMessage: Object;

        try {
            parsedMessage = JSON.parse(message)
        }
        catch (e) {}

        const validation = await this.walletService.validateConnection(authHeader);

        const { receiverId, amount } = message;

        console.log(validation)

        if (validation.isValid && amount && !isNaN(parseFloat(amount)) && receiverId) {
            await this.walletService.requestTransfer(client, validation._id, receiverId, parseFloat(amount));
        }
        else {
            return;
        }
    }
}