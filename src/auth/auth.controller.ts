import {
    Body,
    Controller,
    Get,
    Post,
    Request,
    Res,
    UseGuards,
    UsePipes,
    ValidationPipe,
} from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { Response } from "express";
import { LocalAuthGuard } from "../auth/local-auth.guard";
import { AuthService } from "./auth.service";
import { PreRegisterDto, RegisterDto } from "./dto/register.dto";
import { JwtAuthGuard } from "./jwt-auth.guard";

@ApiTags("authentication")
@Controller("auth")
export class AuthController {
    constructor(private authService: AuthService) {}

    @UseGuards(LocalAuthGuard)
    @UsePipes(new ValidationPipe())
    @Post("login")
    async login(@Request() req, @Res({ passthrough: true }) res: Response) {
        const response = await this.authService.login(req.user);
        const { access_token } = response;

        res.cookie("access_token", access_token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
            maxAge: 60 * 60 * 1000, // 1 hour
            domain: process.env.CLIENT_URL,
        });

        return "Login successful";
    }

    @UseGuards(JwtAuthGuard)
    @Post("logout")
    async logout(@Request() req, @Res({ passthrough: true }) res: Response) {
        await this.authService.logout(req.user);
        res.clearCookie("access_token", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
        });
        return "Logout successful";
    }

    @Post("pre-register")
    async preRegister(@Body() userRegisterData: PreRegisterDto) {
        return this.authService.preRegister(userRegisterData);
    }

    @Post("register")
    async register(@Body() userRegisterDto: RegisterDto) {
        const user = await this.authService.register(userRegisterDto);
        return user;
    }

    @Post("confirm-email")
    async confirmEmail(
        @Body() { token }: { token: string },
        @Res({ passthrough: true }) res: Response
    ) {
        const { valid, user } =
            await this.authService.validateEmailToken(token);

        if (valid) {
            const { access_token } = await this.authService.login(user);

            res.cookie("access_token", access_token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite:
                    process.env.NODE_ENV === "production" ? "none" : "strict",
                maxAge: 15 * 60 * 1000, // 15 minutes
                domain: process.env.CLIENT_URL,
            });

            return {
                message: "Email confirmé avec succès et utilisateur connecté.",
            };
        }
    }

    @Get("refresh-token")
    async findAll(@Res({ passthrough: true }) response: Response) {
        return "hey";
    }

    @ApiBearerAuth()
    @Get("me")
    @UseGuards(JwtAuthGuard)
    async checkAuth(@Request() req) {
        return {
            isAuthenticated: true,
            user: req.user,
        };
    }
}
