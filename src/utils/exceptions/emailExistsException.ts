import { HttpException, HttpStatus } from "@nestjs/common";

export class EmailExistsException extends HttpException {
    constructor() {
        super({
            statusCode: HttpStatus.UNAUTHORIZED,
            error: "A user with this email already exists."
        }, HttpStatus.UNAUTHORIZED);
    }
}