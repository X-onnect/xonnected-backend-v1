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
exports.WalletService = void 0;
const common_1 = require("@nestjs/common");
const wallet_schema_1 = require("../schema/wallet.schema");
const mongoose_1 = require("@nestjs/mongoose");
const common_2 = require("@nestjs/common");
const mongoose_2 = require("mongoose");
let WalletService = class WalletService {
    constructor(walletModel) {
        this.walletModel = walletModel;
    }
    async getBalance(_id) {
        const wallet = await this.walletModel.findOne({ _id }).exec();
        if (wallet) {
            return { balance: wallet.balance };
        }
        else {
            throw new common_2.HttpException({
                status: common_1.HttpStatus.BAD_REQUEST,
                message: 'Wallet does not exist for this user.'
            }, common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async createWallet(wallet) {
        let isValidWalletObject = true;
        console.log(Object.keys(wallet_schema_1.walletBoilerplate));
        Object.keys(wallet_schema_1.walletBoilerplate).every(key => {
            console.log(key);
            if (wallet[key])
                return true;
            else {
                isValidWalletObject = false;
                return false;
            }
        });
        if (!isValidWalletObject) {
            throw new common_2.HttpException({
                status: common_1.HttpStatus.BAD_REQUEST,
                message: 'Invalid object in body of request.'
            }, common_1.HttpStatus.BAD_REQUEST);
        }
        const walletObject = new this.walletModel(wallet);
        return walletObject.save();
    }
};
WalletService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(wallet_schema_1.Wallet.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], WalletService);
exports.WalletService = WalletService;
//# sourceMappingURL=wallet.service.js.map