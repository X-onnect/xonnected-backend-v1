import { NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
export declare class SizeLimitInterceptor implements NestInterceptor {
    private sizeLimit;
    constructor(sizeLimit: number);
    intercept(context: ExecutionContext, next: CallHandler): Observable<any>;
}
