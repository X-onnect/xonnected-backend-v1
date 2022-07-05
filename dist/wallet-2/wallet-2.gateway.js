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
exports.Wallet2Gateway = void 0;
const websockets_1 = require("@nestjs/websockets");
const common_1 = require("@nestjs/common");
const net_1 = require("net");
const wallet_2_service_1 = require("./wallet-2.service");
let Wallet2Gateway = class Wallet2Gateway {
    constructor(walletService) {
        this.walletService = walletService;
    }
    async handleConnection(client, ...args) {
        console.log("connection detected");
    }
    async handleDisconnect(client) {
        console.log("disconnection just happened");
    }
    async handleWalletConnection(client, req) {
        const authHeader = req.handshake.headers.authorization;
        const validation = await this.walletService.validateConnection(authHeader);
        if (validation.isValid) {
            await this.walletService.connectToWallet(client, validation._id);
        }
        else {
            return;
        }
    }
    async requestPayment(client, req, message) {
        const authHeader = req.handshake.headers.authorization;
        let parsedMessage;
        try {
            parsedMessage = JSON.parse(message);
        }
        catch (e) { }
        const validation = await this.walletService.validateConnection(authHeader);
        const { receiverId, amount } = parsedMessage;
        console.log(receiverId, amount);
        if (validation.isValid && amount && !isNaN(parseFloat(amount)) && receiverId) {
            console.log('something');
            await this.walletService.requestTransfer(client, validation._id, receiverId, parseFloat(amount));
        }
        else {
            return;
        }
    }
};
__decorate([
    (0, websockets_1.WebSocketServer)(),
    __metadata("design:type", Object)
], Wallet2Gateway.prototype, "server", void 0);
__decorate([
    (0, websockets_1.SubscribeMessage)('connect-wallet'),
    __param(0, (0, websockets_1.ConnectedSocket)()),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [net_1.Socket, Object]),
    __metadata("design:returntype", Promise)
], Wallet2Gateway.prototype, "handleWalletConnection", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('request-payment'),
    __param(0, (0, websockets_1.ConnectedSocket)()),
    __param(1, (0, common_1.Request)()),
    __param(2, (0, websockets_1.MessageBody)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [net_1.Socket, Object, Object]),
    __metadata("design:returntype", Promise)
], Wallet2Gateway.prototype, "requestPayment", null);
Wallet2Gateway = __decorate([
    (0, websockets_1.WebSocketGateway)({
        cors: {
            origin: '*',
        },
    }),
    __metadata("design:paramtypes", [wallet_2_service_1.Wallet2Service])
], Wallet2Gateway);
exports.Wallet2Gateway = Wallet2Gateway;
//# sourceMappingURL=wallet-2.gateway.js.map