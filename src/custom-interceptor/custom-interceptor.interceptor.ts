import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable, map } from 'rxjs';

@Injectable()
export class CustomInterceptorInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(map((data) => {
      const response = {
        ...data,
        createdAt: data.created_at
      };
      delete response.updated_at;
      delete response.created_at;

      return response
    }));
  }
}
