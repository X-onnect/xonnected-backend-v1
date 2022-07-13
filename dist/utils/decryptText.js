"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.decryptText = void 0;
const crypto_1 = require("crypto");
const util_1 = require("util");
const env_1 = require("./env");
const iv = (0, crypto_1.randomBytes)(16);
const password = env_1.env.HASH_PASSWORD || 'Encryption password';
const salt = env_1.env.SALT || 'salt';
const decryptText = async (encryptedText) => {
    const key = (await (0, util_1.promisify)(crypto_1.scrypt)(password, salt, 32));
    const decipher = (0, crypto_1.createDecipheriv)('aes-256-ctr', key, iv);
    const decryptedText = Buffer.concat([
        decipher.update(encryptedText),
        decipher.final(),
    ]);
    return decryptedText;
};
exports.decryptText = decryptText;
//# sourceMappingURL=decryptText.js.map