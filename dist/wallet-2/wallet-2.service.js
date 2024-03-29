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
const jwt_1 = require("@nestjs/jwt");
var CONNECTION_STATUS;
(function (CONNECTION_STATUS) {
    CONNECTION_STATUS["FAILED"] = "failed";
    CONNECTION_STATUS["PENDING"] = "pending";
    CONNECTION_STATUS["SUCCESSFUL"] = "successful";
})(CONNECTION_STATUS || (CONNECTION_STATUS = {}));
let Wallet2Service = class Wallet2Service {
    constructor(wallet2Model, jwtService) {
        this.wallet2Model = wallet2Model;
        this.jwtService = jwtService;
    }
    async connectToWallet(client, _id) {
        const xummSdK = new xumm_sdk_1.XummSdk(env_1.env.XUMM_API_KEY, env_1.env.XUMM_API_SECRET);
        var clientDisconnected = false;
        const request = {
            "txjson": {
                "TransactionType": "SignIn"
            },
        };
        client.on('disconnect', () => {
            clientDisconnected = true;
        });
        const payload = await xummSdK.payload.createAndSubscribe(request, event => {
            console.log("...waiting for user to sign or reject transaction...");
            if (event.data.signed === true) {
                return event.data;
            }
            if (event.data.signed === false || clientDisconnected) {
                return false;
            }
        });
        console.log("The user should scan this QR code with their xumm app to sign in: ", payload.created.refs.qr_png);
        client.emit('connect-wallet', { qrCode: payload.created.refs.qr_png, status: CONNECTION_STATUS.PENDING });
        const resolveData = await payload.resolved;
        if (resolveData.signed === false || clientDisconnected) {
            console.log('The user rejected the sign transaction');
            client.emit('connect-wallet', { qrCode: payload.created.refs.qr_png, status: CONNECTION_STATUS.FAILED });
        }
        if (resolveData.signed === true) {
            const result = await xummSdK.payload.get(resolveData.payload_uuidv4);
            const userToken = result.application.issued_user_token;
            const userAddress = result.response.signer;
            const userData = await this.wallet2Model.findById(_id).exec();
            if (userData) {
                await this.wallet2Model.findByIdAndUpdate(_id, { address: userAddress, token: userToken });
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
    async requestTransfer(client, senderId, receiverId, amount) {
        const xummSdK = new xumm_sdk_1.XummSdk(env_1.env.XUMM_API_KEY, env_1.env.XUMM_API_SECRET);
        const receiverWallet = await this.wallet2Model.findById(receiverId).exec();
        const senderWallet = await this.wallet2Model.findById(senderId).exec();
        if (amount <= 0) {
            client.emit('request-payment', { error: 'Invalid amount. Cannot transfer 0 XRP or less.' });
            return;
        }
        if (receiverWallet && senderWallet) {
            const address = receiverWallet.address;
            const senderToken = senderWallet.token;
            const newRequest = {
                "txjson": {
                    "TransactionType": "Payment",
                    "Destination": address,
                    "Amount": (amount * 1000000).toString()
                },
                "user_token": senderToken
            };
            const payload = await xummSdK.payload.createAndSubscribe(newRequest, event => {
                console.log("...waiting for user to sign or reject transaction...");
                if (event.data.signed === true) {
                    console.log('The request was approved');
                    client.emit('request-payment', { qrCode: payload.created.refs.qr_png, status: CONNECTION_STATUS.SUCCESSFUL });
                    return event.data;
                }
                if (event.data.signed === false) {
                    console.log('The sign request was rejected');
                    client.emit('request-payment', { qrCode: payload.created.refs.qr_png, status: CONNECTION_STATUS.FAILED });
                    return false;
                }
            });
            client.emit('request-payment', { qrCode: payload.created.refs.qr_png, status: CONNECTION_STATUS.PENDING });
        }
        else {
            client.emit('request-payment', { error: 'An error occured while making the request.' });
        }
    }
    async validateConnection(auth) {
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
};
Wallet2Service = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(wallet_2_schema_1.Wallet2.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        jwt_1.JwtService])
], Wallet2Service);
exports.Wallet2Service = Wallet2Service;
//# sourceMappingURL=wallet-2.service.js.map