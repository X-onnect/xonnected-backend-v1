"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MongodbConnection = void 0;
const { MongoClient } = require('mongodb');
const path = require('path');
const dotenv = require('dotenv');
dotenv.config({ path: path.join(__dirname, "..", "..", ".env") });
const url = process.env.MONGODB_URI || 'mongodb://localhost:27017';
const client = new MongoClient(url);
const dbName = process.env.DB_NAME;
class MongodbConnection {
    async createDatabaseConnection() {
        await client.connect();
        console.log('Connected successfully to server');
        const db = client.db(dbName);
        return {
            user: db.collection('user'),
            content: db.collection('user')
        };
    }
}
exports.MongodbConnection = MongodbConnection;
//# sourceMappingURL=db.js.map