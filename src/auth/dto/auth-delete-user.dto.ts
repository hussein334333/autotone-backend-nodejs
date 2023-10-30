import {ApiProperty} from '@nestjs/swagger'
import {IsNotEmpty, Validate} from 'class-validator'
import {IsExist} from 'src/utils/validators/is-exists.validator'
import {Transform} from 'class-transformer'
import {lowerCaseTransformer} from 'src/utils/transformers/lower-case.transformer'

export class AuthDeleteUserDto {
    @ApiProperty({example: 'test1@example.com'})
    @Transform(lowerCaseTransformer)
    @Validate(IsExist, ['User'], {
        message: 'emailNotExists',
    })
    email: string

}
