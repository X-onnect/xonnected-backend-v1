"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Wallet2Module = void 0;
const common_1 = require("@nestjs/common");
const wallet_2_service_1 = require("./wallet-2.service");
const mongoose_1 = require("@nestjs/mongoose");
const wallet_2_schema_1 = require("../schema/wallet-2.schema");
let Wallet2Module = class Wallet2Module {
};
Wallet2Module = __decorate([
    (0, common_1.Module)({
        providers: [wallet_2_service_1.Wallet2Service],
        imports: [mongoose_1.MongooseModule.forFeature([{ name: wallet_2_schema_1.Wallet2.name, schema: wallet_2_schema_1.Wallet2Schema }])],
        exports: [wallet_2_service_1.Wallet2Service]
    })
], Wallet2Module);
exports.Wallet2Module = Wallet2Module;
//# sourceMappingURL=wallet-2.module.js.map