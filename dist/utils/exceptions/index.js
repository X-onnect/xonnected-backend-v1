"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Exceptions = void 0;
const incompleteRequest_exception_1 = require("./incompleteRequest.exception");
const usernameExists_exception_1 = require("./usernameExists.exception");
const emailExistsException_1 = require("./emailExistsException");
exports.Exceptions = {
    IncompleteRequestException: incompleteRequest_exception_1.IncompleteRequestException,
    UsernameExistsException: usernameExists_exception_1.UsernameExistsException,
    EmailExistsException: emailExistsException_1.EmailExistsException,
};
//# sourceMappingURL=index.js.map