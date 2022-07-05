import { Injectable } from '@nestjs/common';
import { Wallet2, Wallet2Document } from 'src/schema/wallet-2.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { env } from 'src/utils/env';
import { XummSdk } from 'xumm-sdk';
import { AnyJson, XummPostPayloadBodyJson } from 'xumm-sdk/dist/src/types';
import { Socket } from 'net';
import { JwtService } from '@nestjs/jwt';

enum CONNECTION_STATUS {
    FAILED = 'failed',
    PENDING = 'pending',
    SUCCESSFUL = 'successful',
}

@Injectable()
export class Wallet2Service {
    constructor(
        @InjectModel(Wallet2.name) private wallet2Model: Model<Wallet2Document>,
        private jwtService: JwtService
    ) {}

    async connectToWallet(client: Socket, _id: Types.ObjectId | string) {
        const xummSdK = new XummSdk(env.XUMM_API_KEY, env.XUMM_API_SECRET);

        const request: XummPostPayloadBodyJson = {
            "txjson": {
                "TransactionType": "SignIn"
            },
        }; 

        // Creates a user signin request
        const payload = await xummSdK.payload.createAndSubscribe(request, event => {
            console.log("...waiting for user to sign or reject transaction...")

            if (event.data.signed === true) {
                return event.data;
            }

            if (event.data.signed === false) {
                return false;
            }
        });

        // logs url for barcode to be signed by user
        console.log("The user should scan this QR code with their xumm app to sign in: ", payload.created.refs.qr_png);
        client.emit('connect-wallet', { qrCode: payload.created.refs.qr_png, status: CONNECTION_STATUS.PENDING });

        // waits for the user to reject or accept signin request
        const resolveData = await payload.resolved as AnyJson;

        if (resolveData.signed === false) {
            console.log('The user rejected the sign transaction');
            client.emit('connect-wallet', { qrCode: payload.created.refs.qr_png, status: CONNECTION_STATUS.FAILED });
        }
        
        if (resolveData.signed === true) {
            console.log('Whohooo! The sign in request was approved');

            const result = await xummSdK.payload.get(resolveData.payload_uuidv4);

            // Data to back up in db
            console.log('User token:', result.application.issued_user_token);
            console.log('User address:', result.response.signer);

            const userToken = result.application.issued_user_token;
            const userAddress = result.response.signer;

            const userData = await this.wallet2Model.findById(_id).exec();

            if (userData) {
                await this.wallet2Model.findByIdAndUpdate(_id, { address: userAddress, token: userToken })
            }
            else {
                const newWalletData = new this.wallet2Model({
                    _id,
                    address: userAddress,
                    token: userToken,
                    createdAt: new Date().toISOString(),
                });

                await newWalletData.save();
            }

            client.emit('connect-wallet', { qrCode: payload.created.refs.qr_png, status: CONNECTION_STATUS.SUCCESSFUL });
        }
        
    }

    async requestTransfer(client: Socket, senderId: Types.ObjectId | string, receiverId: Types.ObjectId | string, amount: number) {
        const xummSdK = new XummSdk(env.XUMM_API_KEY, env.XUMM_API_SECRET);

        const receiverWallet = await this.wallet2Model.findById(receiverId).exec();
        const senderWallet = await this.wallet2Model.findById(senderId).exec();

        if (receiverWallet && senderWallet) {
            const address = receiverWallet.address;
            const senderToken = senderWallet.token;

            const newRequest: XummPostPayloadBodyJson = {
                "txjson": {
                    "TransactionType": "Payment",
                    "Destination": address,
                    "Amount": (amount * 1000000).toString()
                },
                "user_token": senderToken
            };

            const payload =  await xummSdK.payload.createAndSubscribe(newRequest, event => {
                console.log("...waiting for user to sign or reject transaction...")

                if (event.data.signed === true) {
                    console.log('Whohooo! The request was approved');
                    client.emit('request-payment', { qrCode: payload.created.refs.qr_png, status: CONNECTION_STATUS.SUCCESSFUL });
                    return event.data;
                }

                if (event.data.signed === false) {
                    console.log('Oh fack! The sign request was rejected');
                    client.emit('request-payment', { qrCode: payload.created.refs.qr_png, status: CONNECTION_STATUS.FAILED });
                    return false;
                }
            })

            client.emit('request-payment', { qrCode: payload.created.refs.qr_png, status: CONNECTION_STATUS.PENDING });

            console.log("If the user can't find the notification, show them this qr code just in case:", payload.created.refs.qr_png)
        }

        else {
            client.emit('request-payment', { error: 'An error occured while making the request.' })
        }
    }

    async validateConnection(auth: string) {
        let _id = '';
        let isValid = true;
        try {
            const token = auth.split(' ')[1];

            const payload = this.jwtService.decode(token);

            _id = payload.sub._id;
        }
        catch (e) {
            isValid = false;
        }

        return { _id, isValid };
    }
}
