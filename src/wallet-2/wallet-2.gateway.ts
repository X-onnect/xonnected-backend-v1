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
        console.log("connection detected from " + client.id)
    }

    async handleDisconnect(client: any) {
        console.log("disconnection just happened from " + client.id)
    }

    @SubscribeMessage('connect-wallet')
    async handleWalletConnection(@ConnectedSocket() client: Socket, @Request() req) {
        const authHeader = req.handshake.headers.authorization;
        const authHeaderBackup = req.handshake.auth?.Authorization;

        const validation = await this.walletService.validateConnection(authHeader || authHeaderBackup);

        if (validation.isValid) {
            await this.walletService.connectToWallet(client, validation._id);
        }
        else {
            client.emit('connect-wallet', { error: 'unauthorized' });
        }
    }

    @SubscribeMessage('request-payment')
    async requestPayment(@ConnectedSocket() client: Socket, @Request() req, @MessageBody() message: any) {
        const authHeader = req.handshake.headers.authorization;
        const authHeaderBackup = req.handshake.auth?.Authorization;

        let parsedMessage: any;

        try {
            parsedMessage = JSON.parse(message)
        }
        catch (e) {}

        const validation = await this.walletService.validateConnection(authHeader || authHeaderBackup);

        const { receiverId, amount } = parsedMessage;

        try {
            if (validation.isValid && !isNaN(parseFloat(amount)) && (receiverId !== undefined)) {
                await this.walletService.requestTransfer(client, validation._id, receiverId, parseFloat(amount));
            }
            else {
                client.emit('request-payment', { error: 'unauthorized' });
            }
        } catch (e) {
            client.emit('request-payment', { error: 'bad request' });
        }
    }
}