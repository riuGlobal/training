import { ExceptionFilter, Catch, ArgumentsHost, HttpException } from '@nestjs/common';
import { Request, Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch (exception: HttpException, host: ArgumentsHost) :void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();

    const responseException: Record<string, unknown> = exception.getResponse() as Record<string, unknown>;

    response
      .status(status)
      .json({
        statusCode: status,
        error: exception.message,
        ...(!!responseException.error) && { message: responseException }
      });
  }
}
