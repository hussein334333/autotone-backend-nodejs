import {ApiProperty} from '@nestjs/swagger'
import {IsEmail, IsNotEmpty, Validate} from 'class-validator'
import {Transform} from 'class-transformer'
import {lowerCaseTransformer} from 'src/utils/transformers/lower-case.transformer'
import {IsExist} from "../../utils/validators/is-exists.validator"

export class AuthResendCodeDto {
    @ApiProperty({example: 'test1@example.com'})
    @Transform(lowerCaseTransformer)
    @Validate(IsExist, ['User'], {
        message: 'emailAlreadyExists',
    })
    @IsEmail()
    @IsNotEmpty()
    email: string

}
