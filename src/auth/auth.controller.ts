import {
    Body,
    Controller,
    Get,
    HttpCode,
    HttpStatus,
    Request,
    Post,
    UseGuards,
    Patch,
    Delete,
    SerializeOptions, UseFilters,
} from '@nestjs/common'
import {AuthService} from './auth.service'
import {ApiBearerAuth, ApiTags} from '@nestjs/swagger'
import {AuthEmailLoginDto} from './dto/auth-email-login.dto'
import {AuthForgotPasswordDto} from './dto/auth-forgot-password.dto'
import {AuthResetPasswordDto} from './dto/auth-reset-password.dto'
import {AuthGuard} from '@nestjs/passport'
import {AuthRegisterLoginDto} from './dto/auth-register-login.dto'
import {LoginResponseType} from './types/login-response.type'
import {User} from '../users/entities/user.entity'
import {NullableType} from '../utils/types/nullable.type'
import {AuthVerifyUserDto} from "./dto/auth-verify-user.dto"
import {AuthVerifyLoginDto} from "./dto/auth-verify-login.dto"
import {AuthResendCodeDto} from "./dto/auth-resend-code.dto"

@ApiTags('Auth')
@Controller({
    path: 'auth',
    version: '1',
})
export class AuthController {
    constructor(private readonly service: AuthService) {
    }

    @SerializeOptions({
        groups: ['me'],
    })
    @Post('email/login')
    public login(
        @Body() loginDto: AuthEmailLoginDto,
    ): Promise<LoginResponseType> {
        return this.service.validateLogin(loginDto)
    }

    @Post('login/verify')
    async verifyLogin(
        @Body() verifyLoginDto: AuthVerifyLoginDto,
    ): Promise<void> {
        return await this.service.verifyLogin(verifyLoginDto)
    }

    @Post('email/register')
    async register(@Body() createUserDto: AuthRegisterLoginDto): Promise<{ message: any }> {
        return await this.service.register(createUserDto)
    }

    @Post('email/resend-code')
    async resendCode(@Body() resendCodeDto: AuthResendCodeDto): Promise<void> {
        return this.service.resendCode(resendCodeDto)
    }

    @Post('email/verify')
    async confirmEmail(
        @Body() verifyEmailDto: AuthVerifyUserDto,
    ): Promise<void> {
        return await this.service.verifyEmail(verifyEmailDto)
    }

    @Post('forgot/password')
    async forgotPassword(
        @Body() forgotPasswordDto: AuthForgotPasswordDto,
    ): Promise<void> {
        return this.service.forgotPassword(forgotPasswordDto.email)
    }

    @Post('reset/password')
    resetPassword(@Body() resetPasswordDto: AuthResetPasswordDto): Promise<void> {
        return this.service.resetPassword(
            resetPasswordDto.hash,
            resetPasswordDto.password,
        )
    }

    @ApiBearerAuth()
    @SerializeOptions({
        groups: ['me'],
    })
    @Get('me')
    @UseGuards(AuthGuard('jwt'))
    @HttpCode(HttpStatus.OK)
    public me(@Request() request): Promise<NullableType<User>> {
        return this.service.me(request.user)
    }

    @ApiBearerAuth()
    @SerializeOptions({
        groups: ['me'],
    })
    @Post('refresh')
    @UseGuards(AuthGuard('jwt-refresh'))
    @HttpCode(HttpStatus.OK)
    public refresh(@Request() request): Promise<Omit<LoginResponseType, 'user'>> {
        return this.service.refreshToken({
            sessionId: request.user.sessionId,
        })
    }

    @ApiBearerAuth()
    @Post('logout')
    @UseGuards(AuthGuard('jwt'))
    @HttpCode(HttpStatus.NO_CONTENT)
    public async logout(@Request() request): Promise<void> {
        await this.service.logout({
            sessionId: request.user.sessionId,
        })
    }


    @ApiBearerAuth()
    @Delete('me')
    @UseGuards(AuthGuard('jwt'))
    @HttpCode(HttpStatus.NO_CONTENT)
    public async delete(@Request() request): Promise<void> {
        return this.service.softDelete(request.user)
    }
}
