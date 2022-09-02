import { HttpException, HttpStatus } from "@nestjs/common";

export class ErrorConnectingToXRPLClientException extends HttpException {
    constructor() {
        super({
            statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
            error: "Error connecting to XRPL client."
        }, HttpStatus.INTERNAL_SERVER_ERROR);
    }
}