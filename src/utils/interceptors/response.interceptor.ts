import {
    Injectable,
    NestInterceptor,
    ExecutionContext,
    CallHandler
} from '@nestjs/common'
import {Observable} from 'rxjs'
import {map} from 'rxjs/operators'
import {Response} from '../types/response.type'

/**
 * the following interceptor is executed on all API responses
 */
@Injectable()
export class ResponseInterceptor<T> implements NestInterceptor<T, Response<T>> {
    intercept(
        context: ExecutionContext,
        next: CallHandler
    ): Observable<Response<T>> {
        return next.handle().pipe(
            map((data) => {
                console.log(data)
                return {
                    status: 200,
                    message: data.message,
                    body: data.data ?? data
                }
            })
        )
    }
}
