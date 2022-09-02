"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.env = void 0;
const path = require('path');
const dotenv = require('dotenv');
dotenv.config({ path: path.join(__dirname, "..", "..", ".env") });
const { env } = process;
exports.env = env;
//# sourceMappingURL=env.js.map