import {
    Body,
    Controller,
    Get,
    Post,
    Req,
    Request,
    Response,
    UseGuards,
    UsePipes,
    ValidationPipe,
} from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { ApiTags } from "@nestjs/swagger";
import { Response as Res, Request as Rq } from "express";
import { LocalAuthGuard } from "../auth/local-auth.guard";
import { AuthService } from "./auth.service";
import { RegisterDto } from "./dto/register.dto";

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
    async login(@Request() req, @Response() res: Res) {
        // async login(@Request() req, @Response({ passthrough: true }) res: Res) {
        const token = await this.authService.login(req.user);

        res.cookie("jwt", token, {
            httpOnly: true,
            secure: this.configService.get("NODE_ENV") === "production",
            sameSite: "strict",
            maxAge: 1000 * 60 * 60, // 1 heure
            path: "/",
        });

        console.log("---------------");

        return res.status(200).json({ message: "Login successful" });
    }

    @Get("test")
    async test(@Req() req: Rq) {
        const token = req.cookies["jwt"];
        return token;
    }

    @Post("register")
    register(@Body() userRegisterDto: RegisterDto) {
        return this.authService.register(userRegisterDto);
    }
}
