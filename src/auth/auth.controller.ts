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
import { Prisma } from "@prisma/client";
import { MailService } from "src/mail/mail.service";
import { LocalAuthGuard } from "../auth/local-auth.guard";
import { PrismaService } from "../prisma.service";
import { AuthService } from "./auth.service";
import { PreRegisterDto, RegisterDto } from "./dto/register.dto";
import { JwtAuthGuard } from "./jwt-auth.guard";

@ApiTags("authentication")
@Controller("auth")
export class AuthController {
    constructor(
        private authService: AuthService,
        private mailService: MailService,
        readonly configService: ConfigService,
        private prisma: PrismaService
    ) {}

    @UseGuards(LocalAuthGuard)
    @UsePipes(new ValidationPipe())
    @Post("login")
    async login(@Request() req) {
        return this.authService.login(req.user);
    }

    @Post("pre-register")
    async preRegister(@Body() userRegisterDto: PreRegisterDto) {
        // const preRegisterResponse =
        //     await this.mailService.sendEmail(userRegisterDto);
        const preRegisterResponse = await this.prisma.user.create({
            data: userRegisterDto as Prisma.UserCreateInput,
        });
        return {
            preRegisterMessage: preRegisterResponse,
        };
    }

    @Post("register")
    async register(@Body() userRegisterDto: RegisterDto) {
        const user = await this.authService.register(userRegisterDto);
        return user;
    }

    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    @Post("token-validate")
    async tokenValidate() {
        return this.authService.tokenValidate();
    }
}
