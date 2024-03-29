import { HttpException, HttpStatus } from "@nestjs/common";

export class RecordNotFoundException extends HttpException {
    constructor() {
        super({
            statusCode: HttpStatus.BAD_REQUEST,
            error: "The requested record was not found in the database."
        }, HttpStatus.BAD_REQUEST);
    }
}