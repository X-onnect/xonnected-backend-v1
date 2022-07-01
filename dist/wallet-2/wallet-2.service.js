"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Wallet2Service = void 0;
const common_1 = require("@nestjs/common");
const wallet_2_schema_1 = require("../schema/wallet-2.schema");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const env_1 = require("../utils/env");
const xumm_sdk_1 = require("xumm-sdk");
let Wallet2Service = class Wallet2Service {
    constructor(wallet2Model) {
        this.wallet2Model = wallet2Model;
    }
    async connectToWallet() {
        const xummSdK = new xumm_sdk_1.XummSdk(env_1.env.XUMM_API_KEY, env_1.env.XUMM_API_SECRET);
        const appInfo = await xummSdK.ping();
        console.log(appInfo.application.name);
        const request = {
            "txjson": {
                "TransactionType": "SignIn"
            },
        };
        const payload = await xummSdK.payload.createAndSubscribe(request, event => {
            console.log("...waiting for user to sign or reject transaction...");
            if (event.data.signed === true) {
                return event.data;
            }
            if (event.data.signed === false) {
                return false;
            }
        });
        console.log("The user should scan this QR code with their xumm app to sign in: ", payload.created.refs.qr_png);
        const resolveData = await payload.resolved;
        let userToken;
        if (resolveData.signed === false) {
            console.log('The user rejected the sign transaction');
        }
        if (resolveData.signed === true) {
            console.log('Whohooo! The sign request was signed');
            const result = await xummSdK.payload.get(resolveData.payload_uuidv4);
            console.log('User token:', result.application.issued_user_token);
            console.log('User address:', result.response.signer);
            userToken = result.application.issued_user_token;
        }
        if (userToken) {
            const newRequest = {
                "txjson": {
                    "TransactionType": "Payment",
                    "Destination": "rHa9mjHuD7VbDBWTf3kuMibvKS3EmTYxTd",
                    "Amount": "5"
                },
                "user_token": userToken
            };
            console.log("Sending test transfer request to user to sign");
            const newPayload = await xummSdK.payload.createAndSubscribe(newRequest, event => {
                console.log("...waiting for user to sign or reject transaction...");
                if (event.data.signed === true) {
                    console.log('Whohooo! The sign request was approved');
                    return event.data;
                }
                if (event.data.signed === false) {
                    console.log('Oh fack! The sign request was rejected');
                    return false;
                }
            });
            console.log("If the user can't find the notification, show them this qr code just in case:", newPayload.created.refs.qr_png);
        }
    }
};
Wallet2Service = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(wallet_2_schema_1.Wallet2.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], Wallet2Service);
exports.Wallet2Service = Wallet2Service;
//# sourceMappingURL=wallet-2.service.js.map