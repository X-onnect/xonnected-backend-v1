"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Exceptions = void 0;
const incompleteRequest_exception_1 = require("./incompleteRequest.exception");
const usernameExists_exception_1 = require("./usernameExists.exception");
const emailExistsException_1 = require("./emailExistsException");
const recordNotFoundException_1 = require("./recordNotFoundException");
const errorConnectingToClientException_1 = require("./errorConnectingToClientException");
exports.Exceptions = {
    IncompleteRequestException: incompleteRequest_exception_1.IncompleteRequestException,
    UsernameExistsException: usernameExists_exception_1.UsernameExistsException,
    EmailExistsException: emailExistsException_1.EmailExistsException,
    RecordNotFoundException: recordNotFoundException_1.RecordNotFoundException,
    ErrorConnectingToXRPLClientException: errorConnectingToClientException_1.ErrorConnectingToXRPLClientException,
};
//# sourceMappingURL=index.js.map