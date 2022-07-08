"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorConnectingToXRPLClientException = void 0;
const common_1 = require("@nestjs/common");
class ErrorConnectingToXRPLClientException extends common_1.HttpException {
    constructor() {
        super({
            statusCode: common_1.HttpStatus.INTERNAL_SERVER_ERROR,
            error: "Error connecting to XRPL client."
        }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
    }
}
exports.ErrorConnectingToXRPLClientException = ErrorConnectingToXRPLClientException;
//# sourceMappingURL=errorConnectingToClientException.js.map