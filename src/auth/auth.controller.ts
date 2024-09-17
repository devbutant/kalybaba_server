import {
    Body,
    Controller,
    Get,
    Post,
    Req,
    Res,
    UseGuards,
    UsePipes,
    ValidationPipe,
} from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { ApiTags } from "@nestjs/swagger";
import { Request as ReqType, Response as ResType } from "express";
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
    async login(@Req() req: ReqType, @Res() res: ResType) {
        const token = await this.authService.login(req.user);

        res.cookie("jwt", token, {
            path: "/", // For production, use '/auth/api/refresh-tokens'. We use '/' for localhost in order to work on Chrome.
            httpOnly: true,
            sameSite: "lax",
            secure: false,
            maxAge: 1000 * 60 * 60 * 24 * 30,
        });

        return res
            .status(200)
            .json({ message: "Login successful", jwt: token });
    }

    @UseGuards(JwtAuthGuard)
    @Get("test")
    async test(@Req() req: ReqType) {
        const token = req.cookies.jwt;
        return token
            ? { message: "JWT is present", token }
            : { message: "No JWT found" };
    }

    @Post("register")
    register(@Body() userRegisterDto: RegisterDto) {
        return this.authService.register(userRegisterDto);
    }
}
