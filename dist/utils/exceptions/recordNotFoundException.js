"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RecordNotFoundException = void 0;
const common_1 = require("@nestjs/common");
class RecordNotFoundException extends common_1.HttpException {
    constructor() {
        super({
            statusCode: common_1.HttpStatus.BAD_REQUEST,
            message: "The requested record was not found in the database."
        }, common_1.HttpStatus.BAD_REQUEST);
    }
}
exports.RecordNotFoundException = RecordNotFoundException;
//# sourceMappingURL=recordNotFoundException.js.map