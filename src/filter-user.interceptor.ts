import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Task } from './tasks/task.entity';

@Injectable()
export class FilterUserInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((data) => {
        if (data instanceof Task) {
          const { user, ...filteredTask } = data;
          return filteredTask;
        }
        return data;
      }),
    );
  }
}
