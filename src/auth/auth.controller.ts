import {
    Body,
    Controller,
    Post,
    Request,
    UseGuards,
    UsePipes,
    ValidationPipe,
} from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { randomUUID } from "crypto";
import { LocalAuthGuard } from "../auth/local-auth.guard";
import { MailService } from "../mail/mail.service";
import { PrismaService } from "../prisma.service";
import { AuthService } from "./auth.service";
import { PreRegisterDto, RegisterDto } from "./dto/register.dto";
import { JwtAuthGuard } from "./jwt-auth.guard";

@ApiTags("authentication")
@Controller("auth")
export class AuthController {
    constructor(
        private authService: AuthService,
        readonly configService: ConfigService,
        private prisma: PrismaService,
        private mailService: MailService
    ) {}

    @UseGuards(LocalAuthGuard)
    @UsePipes(new ValidationPipe())
    @Post("login")
    async login(@Request() req) {
        return this.authService.login(req.user);
    }

    @Post("pre-register")
    async preRegister(@Body() userRegisterInfos: PreRegisterDto) {
        console.log(userRegisterInfos);

        const existingUser = await this.prisma.user.findUnique({
            where: { email: userRegisterInfos.email },
        });

        console.log(existingUser);

        if (existingUser) {
            throw new Error("Cet email est déjà utilisé.");
        }

        const verificationToken = randomUUID();
        const preRegisterResponse = await this.prisma.user.create({
            data: {
                ...userRegisterInfos,
                emailVerificationToken: verificationToken,
            },
        });

        const sendingMailStatus = await this.mailService.sendEmail(
            userRegisterInfos,
            verificationToken
        );

        return {
            preRegisterResponse,
            sendingMailStatus,
        };
    }

    @Post("register")
    async register(@Body() userRegisterDto: RegisterDto) {
        const user = await this.authService.register(userRegisterDto);
        return user;
    }

    @Post("confirm-email")
    async confirmEmail(@Body() { token }: { token: string }) {
        const { valid, user } =
            await this.authService.validateEmailToken(token);

        if (valid) {
            const loginResponse = await this.authService.login(user);
            return {
                message: "Email confirmé avec succès et utilisateur connecté.",
                ...loginResponse,
            };
        }

        return {
            message: "Le token est invalide ou l'email n'a pas pu être validé.",
        };
    }

    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    @Post("token-validate")
    async tokenValidate() {
        return this.authService.tokenValidate();
    }
}
