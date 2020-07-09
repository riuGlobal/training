import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface ShortResponse{
    message: string
}

@Injectable()
export class TransformInterceptor<T> implements NestInterceptor<T, ShortResponse> {
  intercept (context: ExecutionContext, next: CallHandler): Observable<ShortResponse> {
    return next.handle().pipe(map(data => typeof data === 'boolean' ? { message: data ? 'Success' : 'Failed' } : data));
  }
}
