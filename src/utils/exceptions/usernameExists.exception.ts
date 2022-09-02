import { HttpException, HttpStatus } from "@nestjs/common";

export class UsernameExistsException extends HttpException {
    constructor() {
        super({
            statusCode: HttpStatus.BAD_REQUEST,
            error: "A user with this username already exists."
        }, HttpStatus.UNAUTHORIZED);
    }
}