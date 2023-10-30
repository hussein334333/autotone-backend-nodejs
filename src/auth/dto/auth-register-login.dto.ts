import {ApiProperty} from '@nestjs/swagger'
import {IsEmail, IsNotEmpty, Validate} from 'class-validator'
import {IsNotExist} from 'src/utils/validators/is-not-exists.validator'
import {Transform} from 'class-transformer'
import {lowerCaseTransformer} from 'src/utils/transformers/lower-case.transformer'

export class AuthRegisterLoginDto {
    @ApiProperty({example: 'test1@example.com'})
    @Transform(lowerCaseTransformer)
    @Validate(IsNotExist, ['User'], {
        message: 'emailAlreadyExists',
    })
    @IsEmail()
    @IsNotEmpty()
    email: string

    @ApiProperty({example: 'John'})
    @IsNotEmpty()
    firstName: string

    @ApiProperty({example: 'Doe'})
    @IsNotEmpty()
    lastName: string

    @ApiProperty({example: '+971502272083'})
    @IsNotEmpty()
    phoneNumber: string

    @ApiProperty({example: 'YUM 570'})
    @IsNotEmpty()
    vehicleRegistrationNumber: string

    @ApiProperty({example: 'Australia'})
    @IsNotEmpty()
    vehicleRegistrationCountry: string

    @ApiProperty({example: 'NSW'})
    @IsNotEmpty()
    vehicleRegistrationState: string
}
