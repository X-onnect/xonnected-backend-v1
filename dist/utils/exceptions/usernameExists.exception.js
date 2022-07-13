"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsernameExistsException = void 0;
const common_1 = require("@nestjs/common");
class UsernameExistsException extends common_1.HttpException {
    constructor() {
        super({
            statusCode: common_1.HttpStatus.BAD_REQUEST,
            error: "A user with this username already exists."
        }, common_1.HttpStatus.UNAUTHORIZED);
    }
}
exports.UsernameExistsException = UsernameExistsException;
//# sourceMappingURL=usernameExists.exception.js.map