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
exports.UsersController = void 0;
const common_1 = require("@nestjs/common");
const users_service_1 = require("./users.service");
const swagger_1 = require("@nestjs/swagger");
const user_dto_1 = require("../dto/response/user.dto");
const sign_up_dto_1 = require("../dto/sign-up.dto");
const delete_user_dto_1 = require("../dto/delete-user.dto");
const delete_user_response_dto_1 = require("../dto/response/delete-user-response.dto");
let UsersController = class UsersController {
    constructor(usersService) {
        this.usersService = usersService;
    }
    async getUser(params) {
        const { id } = params;
        return await this.usersService.findUserById(id);
    }
    async getAll() {
        return await this.usersService.findAll();
    }
    async update(body, req) {
        const { _id } = req.user;
        const { username, password, email } = body;
        return await this.usersService.update(_id, username, email, password);
    }
    async deleteUser(body) {
        const { _id } = body;
        const response = await this.usersService.deleteUser(_id);
        if (response.acknowledged && response.deletedCount > 0) {
            return { message: 'Success' };
        }
        else {
            return { message: 'No match found' };
        }
    }
};
__decorate([
    (0, swagger_1.ApiBearerAuth)("Bearer"),
    (0, swagger_1.ApiOperation)({ summary: 'Gets data of user matching given id.' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'success',
        type: user_dto_1.UserDto
    }),
    (0, swagger_1.ApiParam)({ description: 'id of the post to be retrieved.', name: 'id' }),
    (0, common_1.Get)(":id"),
    __param(0, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "getUser", null);
__decorate([
    (0, swagger_1.ApiBearerAuth)("Bearer"),
    (0, swagger_1.ApiOperation)({ summary: 'Gets data of all users.' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'success',
        isArray: true,
        type: user_dto_1.UserDto
    }),
    (0, common_1.Get)('all'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "getAll", null);
__decorate([
    (0, swagger_1.ApiBearerAuth)("Bearer"),
    (0, swagger_1.ApiOperation)({ summary: `Updates a user's sign-in information.` }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'success',
        type: user_dto_1.UserDto
    }),
    (0, swagger_1.ApiBody)({ type: sign_up_dto_1.SignUpDto }),
    (0, common_1.Put)(),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "update", null);
__decorate([
    (0, swagger_1.ApiBearerAuth)("Bearer"),
    (0, swagger_1.ApiOperation)({ summary: `Deletes all data related to a user.` }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'success',
        type: delete_user_response_dto_1.DeleteUserResponseDto,
    }),
    (0, swagger_1.ApiBody)({ type: delete_user_dto_1.DeleteUserDto }),
    (0, common_1.Delete)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "deleteUser", null);
UsersController = __decorate([
    (0, swagger_1.ApiTags)("User management"),
    (0, common_1.Controller)('user'),
    __metadata("design:paramtypes", [users_service_1.UsersService])
], UsersController);
exports.UsersController = UsersController;
//# sourceMappingURL=users.controller.js.map