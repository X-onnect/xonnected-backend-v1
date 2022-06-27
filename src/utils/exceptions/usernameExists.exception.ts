import { HttpException, HttpStatus } from "@nestjs/common";

export class UsernameExistsException extends HttpException {
    constructor() {
        super({
            statusCode: HttpStatus.UNAUTHORIZED,
            message: "A user with this username already exists."
        }, HttpStatus.UNAUTHORIZED);
    }
}