import {ExceptionFilter, Catch, ArgumentsHost, HttpException} from '@nestjs/common'
import {Response} from 'express'

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
    catch(exception: HttpException, host: ArgumentsHost) {
        const ctx = host.switchToHttp()
        const response = ctx.getResponse<Response>()
        const status = exception.getStatus()
        const exceptionResponse: any | string = exception.getResponse()
        response
            .status(status)
            .json({
                status: status,
                errors: exceptionResponse?.status ?
                    Object.entries(exceptionResponse.errors).map(([key, value]) => `${key}: ${value}`)
                    : [exception.getResponse()],
                data: {}
            })
    }
}
