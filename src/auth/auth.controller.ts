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
import { MailService } from "src/mail/mail.service";
import { LocalAuthGuard } from "../auth/local-auth.guard";
import { AuthService } from "./auth.service";
import { RegisterDto } from "./dto/register.dto";
import { JwtAuthGuard } from "./jwt-auth.guard";

@ApiTags("authentication")
@Controller("auth")
export class AuthController {
    constructor(
        private authService: AuthService,
        private mailService: MailService,
        readonly configService: ConfigService
    ) {}

    @UseGuards(LocalAuthGuard)
    @UsePipes(new ValidationPipe())
    @Post("login")
    async login(@Request() req) {
        return this.authService.login(req.user);
    }

    @Post("register")
    async register(@Body() userRegisterDto: RegisterDto) {
        const user = await this.authService.register(userRegisterDto);
        await this.mailService.sendEmail(user.email); // Send welcome email
        return user;
    }

    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    @Post("token-validate")
    async tokenValidate() {
        return this.authService.tokenValidate();
    }
}
