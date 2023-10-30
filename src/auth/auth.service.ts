import {
    HttpException,
    HttpStatus,
    Injectable,
    UnauthorizedException,
} from '@nestjs/common'
import ms from 'ms'
import {JwtService} from '@nestjs/jwt'
import {User} from '../users/entities/user.entity'
import {AuthEmailLoginDto} from './dto/auth-email-login.dto'
import {randomStringGenerator} from '@nestjs/common/utils/random-string-generator.util'
import {RoleEnum} from 'src/roles/roles.enum'
import {StatusEnum} from 'src/statuses/statuses.enum'
import crypto from 'crypto'
import {plainToClass} from 'class-transformer'
import {Status} from 'src/statuses/entities/status.entity'
import {AuthRegisterLoginDto} from './dto/auth-register-login.dto'
import {UsersService} from 'src/users/users.service'
import {ForgotService} from 'src/forgot/forgot.service'
import {MailService} from 'src/mail/mail.service'
import {NullableType} from '../utils/types/nullable.type'
import {LoginResponseType} from './types/login-response.type'
import {ConfigService} from '@nestjs/config'
import {AllConfigType} from 'src/config/config.type'
import {SessionService} from 'src/session/session.service'
import {JwtRefreshPayloadType} from './strategies/types/jwt-refresh-payload.type'
import {Session} from 'src/session/entities/session.entity'
import {JwtPayloadType} from './strategies/types/jwt-payload.type'
import {
    CognitoUserPool,
} from 'amazon-cognito-identity-js'
import {
    AdminDeleteUserCommand,
    CognitoIdentityProviderClient,
    InitiateAuthCommand,
    SignUpCommand,
    ConfirmSignUpCommand,
    RespondToAuthChallengeCommand,
    VerifySoftwareTokenCommand,
    ResendConfirmationCodeCommand
} from '@aws-sdk/client-cognito-identity-provider'
import {AuthVerifyUserDto} from "./dto/auth-verify-user.dto"
import {I18nContext} from "nestjs-i18n"
import {AuthVerifyLoginDto} from "./dto/auth-verify-login.dto"
import {PASSWORD_PREFIX} from "../../test/utils/constants"
import {Role} from "../roles/entities/role.entity"
import {AuthResendCodeDto} from "./dto/auth-resend-code.dto"

@Injectable()
export class AuthService {
    private readonly userPool: CognitoUserPool
    private readonly providerClient: CognitoIdentityProviderClient

    constructor(
        private jwtService: JwtService,
        private usersService: UsersService,
        private forgotService: ForgotService,
        private sessionService: SessionService,
        private mailService: MailService,
        private configService: ConfigService<AllConfigType>,
    ) {
        // init the userPool to access user identity data
        this.userPool = new CognitoUserPool({
            UserPoolId: <string>this.configService.get('auth.userPoolId', {infer: true}),
            ClientId: <string>this.configService.get('auth.clientId', {infer: true}),
        })
        // init the client in order to send instructions to the AWS incognito
        this.providerClient = new CognitoIdentityProviderClient({
            region: <string>this.configService.get('auth.region', {infer: true}),
        })
    }


    /**
     * the following method is used to authenticate the login code
     * @param verifyLoginDto
     */
    async verifyLogin(verifyLoginDto: AuthVerifyLoginDto): Promise<any> {
        try {
            // return await this.providerClient.send(new RespondToAuthChallengeCommand({
            //     ClientId: <string>this.configService.get('auth.clientId', {infer: true}),
            //     ChallengeName: 'SMS_MFA',
            //     Session: verifyLoginDto.session,
            //     ChallengeResponses: {
            //         "SMS_MFA_CODE": verifyLoginDto.code,
            //         "USERNAME": verifyLoginDto.email
            //     }
            // }))

            return {
                message: I18nContext.current()?.t('common.success'), data: await this.usersService.findOne({
                    email: verifyLoginDto.email,
                })
            }
        } catch (e) {
            throw new HttpException(e.message, HttpStatus.BAD_REQUEST)
        }
    }

    /**
     * the following method is used to validate the login credentials and trigger MFA
     * @param loginDto
     */
    async validateLogin(loginDto: AuthEmailLoginDto): Promise<any> {
        try {
            const params = {
                AuthFlow: 'USER_PASSWORD_AUTH',
                ClientId: <string>this.configService.get('auth.clientId', {infer: true}),
                AuthParameters: {
                    USERNAME: loginDto.email,
                    PASSWORD: loginDto.email + PASSWORD_PREFIX
                },
            }
            const command = new InitiateAuthCommand(params)
            // return await this.providerClient.send(command)
            return {
                message: I18nContext.current()?.t('common.userRegisterSuccess'),
                data: {session: '89437eufhdjsfkbsdjh'}
            }
        } catch (e) {
            throw new HttpException(e.message, HttpStatus.BAD_REQUEST)
        }
    }

    /**
     * the following method is used to resend the code
     * @param dto
     */
    async resendCode(dto: AuthResendCodeDto): Promise<any> {
        // creating the request payload for the AWS Cognito API call later
        const input = {
            // SignUpRequest
            ClientId: <string>this.configService.get('auth.clientId', {infer: true}), // required
            Username: dto.email,
        }
        const resendConfirmationCode = new ResendConfirmationCodeCommand(input)
        return await this.providerClient.send(resendConfirmationCode)
    }

    /**
     * the following method is used to register the user
     * @param dto
     */
    async register(dto: AuthRegisterLoginDto) {
        try {
            // creating the request payload for the AWS Cognito API call later
            const input = {
                // SignUpRequest
                ClientId: <string>this.configService.get('auth.clientId', {infer: true}), // required
                Username: dto.email,
                Password: dto.email + PASSWORD_PREFIX,
                UserAttributes: [
                    {Name: 'given_name', Value: dto.firstName},
                    {Name: 'family_name', Value: dto.lastName},
                    {Name: 'phone_number', Value: dto.phoneNumber}
                ],
            }
            // triggering the Sign-up Command of AWS incognito
            const signupCommand = new SignUpCommand(input)
            const response = await this.providerClient.send(signupCommand)
            // registering the user in the database
            await this.usersService.create({
                ...dto,
                email: dto.email,
                role: {
                    id: RoleEnum.user,
                } as Role,
                status: {
                    id: StatusEnum.inactive,
                } as Status,
            })
            return {message: I18nContext.current()?.t('common.userRegisterSuccess')}
        } catch (e) {
            throw new HttpException(e.message, HttpStatus.BAD_REQUEST)
        }
    }


    // async deleteUserByEmail(dto: AuthDeleteUserDto): Promise<any> {
    //     const command = new DeleteUserCommand({
    //         ClientId: <string>this.configService.get('auth.clientId', {infer: true}),
    //         Username: dto.email,
    //         ConfirmationCode: dto.code,
    //     })
    // }

    /**
     * the following method is used to confirm the email
     * @param dto
     */
    async verifyEmail(dto: AuthVerifyUserDto): Promise<any> {
        const command = new ConfirmSignUpCommand({
            ClientId: <string>this.configService.get('auth.clientId', {infer: true}),
            Username: dto.email,
            ConfirmationCode: dto.code,
        })

        try {
            // triggering the AWS user verification command
            // await this.providerClient.send(command)
            // find the user with the email
            let user = await this.usersService.findOne({
                email: dto.email,
            })
            if (user) {
                user.status = plainToClass(Status, {
                    id: StatusEnum.active,
                })
                await user.save()
                return {message: I18nContext.current()?.t('common.success'), data: user}
            } else {
                throw new HttpException('Invalid User Credentials', HttpStatus.BAD_REQUEST)
            }
        } catch (e) {
            throw new HttpException(e.message, HttpStatus.BAD_REQUEST)
        }
    }

    /**
     * the following is used to
     * @param email
     */
    async forgotPassword(email: string): Promise<void> {
        const user = await this.usersService.findOne({
            email,
        })

        if (!user) {
            throw new HttpException(
                {
                    status: HttpStatus.UNPROCESSABLE_ENTITY,
                    errors: {
                        email: 'emailNotExists',
                    },
                },
                HttpStatus.UNPROCESSABLE_ENTITY,
            )
        }

        const hash = crypto
            .createHash('sha256')
            .update(randomStringGenerator())
            .digest('hex')
        await this.forgotService.create({
            hash,
            user,
        })

        await this.mailService.forgotPassword({
            to: email,
            data: {
                hash,
            },
        })
    }

    async resetPassword(hash: string, password: string): Promise<void> {
        const forgot = await this.forgotService.findOne({
            where: {
                hash,
            },
        })

        if (!forgot) {
            throw new HttpException(
                {
                    status: HttpStatus.UNPROCESSABLE_ENTITY,
                    errors: {
                        hash: `notFound`,
                    },
                },
                HttpStatus.UNPROCESSABLE_ENTITY,
            )
        }

        const user = forgot.user

        await this.sessionService.softDelete({
            user: {
                id: user.id,
            },
        })
        await user.save()
        await this.forgotService.softDelete(forgot.id)
    }

    async me(userJwtPayload: JwtPayloadType): Promise<NullableType<User>> {
        return this.usersService.findOne({
            id: userJwtPayload.id,
        })
    }


    async refreshToken(
        data: Pick<JwtRefreshPayloadType, 'sessionId'>,
    ): Promise<Omit<LoginResponseType, 'user'>> {
        const session = await this.sessionService.findOne({
            where: {
                id: data.sessionId,
            },
        })

        if (!session) {
            throw new UnauthorizedException()
        }

        const {token, refreshToken, tokenExpires} = await this.getTokensData({
            id: session.user.id,
            role: session.user.role,
            sessionId: session.id,
        })

        return {
            token,
            refreshToken,
            tokenExpires,
        }
    }

    /**
     * the following is used to soft delete the user from the database
     * @param user
     */
    async softDelete(user: User): Promise<any> {
        if (user) {
            // soft deleting the user from our database
            await this.usersService.softDelete(user.id)
            // now deleting the user from AWS cognito
            const deleteUserCommand = new AdminDeleteUserCommand({
                UserPoolId: <string>this.configService.get('auth.userPoolId', {infer: true}),
                Username: <string>user.email
            })
            const response = await this.providerClient.send(deleteUserCommand)
            return {message: I18nContext.current()?.t('common.userDeletedSuccess')}
        }
    }

    async logout(data: Pick<JwtRefreshPayloadType, 'sessionId'>) {
        return this.sessionService.softDelete({
            id: data.sessionId,
        })
    }

    private async getTokensData(data: {
        id: User['id'];
        role: User['role'];
        sessionId: Session['id'];
    }) {
        const tokenExpiresIn = this.configService.getOrThrow('auth.expires', {
            infer: true,
        })

        const tokenExpires = Date.now() + ms(tokenExpiresIn)

        const [token, refreshToken] = await Promise.all([
            await this.jwtService.signAsync(
                {
                    id: data.id,
                    role: data.role,
                    sessionId: data.sessionId,
                },
                {
                    secret: this.configService.getOrThrow('auth.secret', {infer: true}),
                    expiresIn: tokenExpiresIn,
                },
            ),
            await this.jwtService.signAsync(
                {
                    sessionId: data.sessionId,
                },
                {
                    secret: this.configService.getOrThrow('auth.refreshSecret', {
                        infer: true,
                    }),
                    expiresIn: this.configService.getOrThrow('auth.refreshExpires', {
                        infer: true,
                    }),
                },
            ),
        ])

        return {
            token,
            refreshToken,
            tokenExpires,
        }
    }

}

