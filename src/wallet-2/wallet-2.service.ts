import { Injectable } from '@nestjs/common';
import { Wallet2, Wallet2Document } from 'src/schema/wallet-2.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Exceptions } from 'src/utils/exceptions';
import { Model, Types } from 'mongoose';
import { env } from 'src/utils/env';
import { XummSdk } from 'xumm-sdk';
import { AnyJson, XummPostPayloadBodyJson } from 'xumm-sdk/dist/src/types';

@Injectable()
export class Wallet2Service {
    constructor(@InjectModel(Wallet2.name) private wallet2Model: Model<Wallet2Document>) {}

    async connectToWallet() {
        const xummSdK = new XummSdk(env.XUMM_API_KEY, env.XUMM_API_SECRET);
        const appInfo = await xummSdK.ping();

        console.log(appInfo.application.name)
        
        const request: XummPostPayloadBodyJson = {
            "txjson": {
                "TransactionType": "SignIn"
            },
        } 

        // Creates a user signin request
        const payload = await xummSdK.payload.createAndSubscribe(request, event => {
            console.log("...waiting for user to sign or reject transaction...")

            if (event.data.signed === true) {
                return event.data;
            }

            if (event.data.signed === false) {
                return false;
            }
        })

        // logs url for barcode to be signed by user
        console.log("The user should scan this QR code with their xumm app to sign in: ", payload.created.refs.qr_png);

        // waits for the user to reject or accept signin request
        const resolveData = await payload.resolved as AnyJson;

        let userToken: string;

        if (resolveData.signed === false) {
            console.log('The user rejected the sign transaction');
        }
        
        if (resolveData.signed === true) {
            console.log('Whohooo! The sign request was signed');

            const result = await xummSdK.payload.get(resolveData.payload_uuidv4);

            // Data to back up in db
            console.log('User token:', result.application.issued_user_token);
            console.log('User address:', result.response.signer);
            userToken = result.application.issued_user_token;
        }

        if (userToken) {
            const newRequest: XummPostPayloadBodyJson = {
                "txjson": {
                    "TransactionType": "Payment",
                    "Destination": "rHa9mjHuD7VbDBWTf3kuMibvKS3EmTYxTd",
                    "Amount": "5"
                },
                "user_token": userToken
            }

            console.log("Sending test transfer request to user to sign")

            const newPayload =  await xummSdK.payload.createAndSubscribe(newRequest, event => {
                console.log("...waiting for user to sign or reject transaction...")

                if (event.data.signed === true) {
                    console.log('Whohooo! The sign request was approved');
                    return event.data;
                }

                if (event.data.signed === false) {
                    console.log('Oh fack! The sign request was rejected');
                    return false;
                }
            })

            console.log("If the user can't find the notification, show them this qr code just in case:",newPayload.created.refs.qr_png)
        }
    }

}
