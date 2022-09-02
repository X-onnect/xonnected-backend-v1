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
exports.AuthController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const auth_service_1 = require("./auth.service");
const local_auth_guard_1 = require("./local-auth.guard");
const jwt_auth_guard_1 = require("./jwt-auth.guard");
const users_service_1 = require("../users/users.service");
const log_in_response_dto_1 = require("../dto/response/log-in-response.dto");
const log_in_dto_1 = require("../dto/log-in.dto");
const user_dto_1 = require("../dto/response/user.dto");
const sign_up_dto_1 = require("../dto/sign-up.dto");
const app_global_1 = require("../app.global");
let AuthController = class AuthController {
    constructor(authService, userService) {
        this.authService = authService;
        this.userService = userService;
    }
    async login(req, body) {
        return this.authService.login(req.user);
    }
    async getUser(req) {
        return req.user;
    }
    async signup(body) {
        return this.userService.createUser(body);
    }
};
__decorate([
    (0, swagger_1.ApiOperation)({ summary: `Handles a user's log in request.` }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Object containing authentication header.',
        type: log_in_response_dto_1.LogInResponseDto,
    }),
    (0, swagger_1.ApiBody)({ type: log_in_dto_1.LogInDto }),
    (0, app_global_1.Public)(),
    (0, common_1.UseGuards)(local_auth_guard_1.LocalAuthGuard),
    (0, common_1.Post)('login'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, log_in_dto_1.LogInDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "login", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiOperation)({ summary: `Gets the data of the logged-in user.` }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'User object.',
        type: user_dto_1.UserDto,
    }),
    (0, common_1.Get)('user'),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "getUser", null);
__decorate([
    (0, app_global_1.Public)(),
    (0, swagger_1.ApiOperation)({ summary: "Performs sign-up operation for a new user." }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'success',
        type: user_dto_1.UserDto
    }),
    (0, swagger_1.ApiBody)({ type: sign_up_dto_1.SignUpDto }),
    (0, common_1.Post)('signup'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "signup", null);
AuthController = __decorate([
    (0, swagger_1.ApiTags)("Authentication Manager"),
    (0, common_1.Controller)('auth'),
    __metadata("design:paramtypes", [auth_service_1.AuthService, users_service_1.UsersService])
], AuthController);
exports.AuthController = AuthController;
//# sourceMappingURL=auth.controller.js.map