"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmailExistsException = void 0;
const common_1 = require("@nestjs/common");
class EmailExistsException extends common_1.HttpException {
    constructor() {
        super({
            statusCode: common_1.HttpStatus.UNAUTHORIZED,
            message: "A user with this email already exists."
        }, common_1.HttpStatus.UNAUTHORIZED);
    }
}
exports.EmailExistsException = EmailExistsException;
//# sourceMappingURL=emailExistsException.js.map