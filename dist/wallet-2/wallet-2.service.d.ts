/// <reference types="node" />
import { Wallet2Document } from 'src/schema/wallet-2.schema';
import { Model, Types } from 'mongoose';
import { Socket } from 'net';
import { JwtService } from '@nestjs/jwt';
export declare class Wallet2Service {
    private wallet2Model;
    private jwtService;
    constructor(wallet2Model: Model<Wallet2Document>, jwtService: JwtService);
    connectToWallet(client: Socket, _id: Types.ObjectId | string): Promise<void>;
    requestTransfer(client: Socket, senderId: Types.ObjectId | string, receiverId: Types.ObjectId | string, amount: number): Promise<void>;
    validateConnection(auth: string): Promise<{
        _id: string;
        isValid: boolean;
    }>;
}
