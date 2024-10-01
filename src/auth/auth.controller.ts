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
import { LocalAuthGuard } from "../auth/local-auth.guard";
import { AuthService } from "./auth.service";
import { RegisterDto } from "./dto/register.dto";
import { JwtAuthGuard } from "./jwt-auth.guard";

@ApiTags("authentication")
@Controller("auth")
export class AuthController {
    constructor(
        private authService: AuthService,
        readonly configService: ConfigService
    ) {}

    @UseGuards(LocalAuthGuard)
    @UsePipes(new ValidationPipe())
    @Post("login")
    async login(@Request() req) {
        return this.authService.login(req.user);
    }

    @Post("register")
    register(@Body() userRegisterDto: RegisterDto) {
        return this.authService.register(userRegisterDto);
    }

    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    @Post("token-validate")
    async tokenValidate() {
        return this.authService.tokenValidate();
    }
}
