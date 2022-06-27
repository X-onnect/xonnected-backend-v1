"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IncompleteRequestException = void 0;
const common_1 = require("@nestjs/common");
class IncompleteRequestException extends common_1.HttpException {
    constructor() {
        super({
            statusCode: common_1.HttpStatus.BAD_REQUEST,
            message: "Your request body is missing certain required parameters."
        }, common_1.HttpStatus.BAD_REQUEST);
    }
}
exports.IncompleteRequestException = IncompleteRequestException;
//# sourceMappingURL=incompleteRequest.exception.js.map