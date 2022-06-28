"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const exceptions_1 = require("../utils/exceptions");
const mongoose_1 = require("mongoose");
const mongoose_2 = require("@nestjs/mongoose");
const user_schema_1 = require("../schema/user.schema");
const objectsHaveTheSameKeys_1 = require("../utils/objectsHaveTheSameKeys");
let UsersService = class UsersService {
    constructor(userModel) {
        this.userModel = userModel;
    }
    async findOne(email) {
        return this.userModel.findOne({ email }).exec();
    }
    async findUserById(_id) {
        return this.userModel.findOne({ _id }).exec();
    }
    async findAll() {
        return this.userModel.find({}, "-password").exec();
    }
    async createUser(user) {
        const isUserObjectComplete = (0, objectsHaveTheSameKeys_1.objectsHaveTheSameKeys)(user_schema_1.userDTO, user);
        if (!isUserObjectComplete) {
            throw new exceptions_1.Exceptions.IncompleteRequestException();
        }
        const existingUsername = await this.userModel.findOne({ username: user.username }).exec();
        if (existingUsername)
            throw new exceptions_1.Exceptions.UsernameExistsException();
        const existingEmail = await this.userModel.findOne({ email: user.email }).exec();
        if (existingEmail) {
            throw new exceptions_1.Exceptions.EmailExistsException();
        }
        const createdUser = new this.userModel(Object.assign(Object.assign({}, user), { createdAt: new Date().toISOString() }));
        return await createdUser.save();
    }
    async update(id, username, email, password) {
        return this.userModel.findByIdAndUpdate(id, { username, email, password });
    }
    async deleteUser(id) {
        return this.userModel.deleteOne({ _id: id });
    }
};
UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_2.InjectModel)(user_schema_1.User.name)),
    __metadata("design:paramtypes", [mongoose_1.Model])
], UsersService);
exports.UsersService = UsersService;
//# sourceMappingURL=users.service.js.map