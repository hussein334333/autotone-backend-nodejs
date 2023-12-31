import {
    ClassSerializerInterceptor,
    ValidationPipe,
    VersioningType,
} from '@nestjs/common'
import {ConfigService} from '@nestjs/config'
import {HttpAdapterHost, NestFactory, Reflector} from '@nestjs/core'
import {DocumentBuilder, SwaggerModule} from '@nestjs/swagger'
import {useContainer} from 'class-validator'
import {AppModule} from './app.module'
import validationOptions from './utils/validation-options'
import {AllConfigType} from './config/config.type'
import {HttpExceptionFilter} from "./utils/filters/http-exception.filter"
import {ResponseInterceptor} from "./utils/interceptors/response.interceptor"

async function bootstrap() {
    const app = await NestFactory.create(AppModule, {cors: true})
    useContainer(app.select(AppModule), {fallbackOnErrors: true})
    const configService = app.get(ConfigService<AllConfigType>)

    // registering the project wide exception handler
    app.useGlobalFilters(new HttpExceptionFilter())

    // adding response interceptor to all the APIs Responses
    // app.useGlobalInterceptors(new ResponseInterceptor())
    app.enableShutdownHooks()
    app.setGlobalPrefix(
        configService.getOrThrow('app.apiPrefix', {infer: true}),
        {
            exclude: ['/'],
        },
    )
    app.enableVersioning({
        type: VersioningType.URI,
    })
    app.useGlobalPipes(new ValidationPipe(validationOptions))
    // app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)))

    const options = new DocumentBuilder()
        .setTitle('Autoone API')
        .setDescription('NestJS API docs')
        .setVersion('1.0')
        .addBearerAuth()
        .build()

    const document = SwaggerModule.createDocument(app, options)
    SwaggerModule.setup('docs', app, document)

    await app.listen(configService.getOrThrow('app.port', {infer: true}))
}

void bootstrap()
