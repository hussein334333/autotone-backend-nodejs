import {ApiProperty} from '@nestjs/swagger'
import {IsEmail, MinLength} from 'class-validator'
import {Transform} from 'class-transformer'
import {lowerCaseTransformer} from 'src/utils/transformers/lower-case.transformer'

export class AuthVerifyUserDto {
    @ApiProperty({example: 'test1@example.com'})
    @Transform(lowerCaseTransformer)
    @IsEmail()
    email: string

    @ApiProperty()
    @MinLength(6)
    code: string
}
