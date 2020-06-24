import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { Request } from 'express';

@Injectable()
export class UserGuard implements CanActivate {
  canActivate (
    context: ExecutionContext
  ): boolean {
    const request = context.switchToHttp().getRequest<Request>();
    if (!this.validateRequest(request)) { throw new ForbiddenException()}
    return true;
  }

  validateRequest (
    request: Request
  ): boolean {
    return !!request.get('uid');
  }
}
