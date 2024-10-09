import {
    ForbiddenException,
    Injectable,
    UnauthorizedException,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Prisma, User } from "@prisma/client";
import { randomUUID } from "crypto";
import { MailService } from "src/mail/mail.service";
import { PrismaService } from "../prisma/prisma.service";
import { UserService } from "../user/user.service";
import { passwordCompare, passwordHash } from "../utilities/password.utility";
import { AuthServiceInterface } from "./auth.interface";
import { LoginDto } from "./dto/login.dto";
import { PreRegisterDto, RegisterDto } from "./dto/register.dto";

@Injectable()
export class AuthService implements AuthServiceInterface {
    constructor(
        private userService: UserService,
        private jwtService: JwtService,
        private prisma: PrismaService,
        private mailService: MailService
    ) {}

    async register(userRegisterData: RegisterDto): Promise<User> {
        const initialPassword = userRegisterData.password;
        const hashedPassword = await passwordHash(initialPassword);
        userRegisterData.password = hashedPassword;

        return this.prisma.user.create({
            data: userRegisterData as Prisma.UserCreateInput,
        });
    }

    async sendVerificationEmail(
        user: PreRegisterDto,
        verificationToken: string
    ) {
        try {
            const emailResponse = await this.mailService.sendEmail(
                user,
                verificationToken
            );
            console.log(emailResponse);
        } catch (error) {
            console.error(
                "Une erreur s'est produite lors de la tentative de l'envoie d'e-mail:",
                error
            );
            throw new Error(
                "Une erreur s'est produite lors de la tentative de l'envoie d'e-mail"
            );
        }
    }

    async completeTheProfile(userRegisterData: PreRegisterDto): Promise<void> {
        const existingUser = await this.prisma.user.findUnique({
            where: { email: userRegisterData.email },
        });

        const verificationToken = randomUUID();

        if (!existingUser) {
            await this.prisma.user.create({
                data: {
                    ...userRegisterData,
                    emailVerificationToken: verificationToken,
                },
            });
        } else if (existingUser && existingUser.role !== "USER") {
            await this.prisma.user.update({
                where: { email: userRegisterData.email },
                data: { emailVerificationToken: verificationToken },
            });
        } else if (existingUser && existingUser.role === "USER") {
            throw new ForbiddenException(
                "Un compte existe déjà avec cet email, veuillez vous connecter"
            );
        }

        await this.sendVerificationEmail(userRegisterData, verificationToken);
    }

    async validateEmailToken(token: string) {
        const user = await this.prisma.user.findUnique({
            where: {
                emailVerificationToken: token,
            },
        });

        if (user && user.role !== "USER") {
            await this.prisma.user.update({
                where: { id: user.id },
                data: {
                    emailVerificationToken: null,
                },
            });

            return { valid: true, user };
        }

        return { valid: false };
    }

    async validateUser(loginDto: LoginDto): Promise<any> {
        const user = await this.userService.user({ email: loginDto.email });

        if (!user) {
            throw new UnauthorizedException("Invalid credentials");
        }

        const passwordIsValid = await passwordCompare(
            loginDto.password,
            user.password
        );

        if (!passwordIsValid) {
            throw new UnauthorizedException("Invalid credentials");
        }

        const { password: userPassword, ...result } = user;
        return result;
    }

    async login(user: any): Promise<{ access_token: string }> {
        const payload = { sub: user.email, id: user.id };

        return {
            access_token: await this.jwtService.signAsync(payload),
        };
    }

    async tokenValidate() {
        return { message: "Token is valid" };
    }
}

// TODO faire un refresh token ici

// async refreshToken(refreshToken: string): Promise<{ access_token: string }> {
//     try {
//     // 1. Vérification du token de rafraîchissement
//     const payload = this.jwtService.verify(refreshToken, {
//         secret: process.env.JWT_REFRESH_SECRET,
//     });

//     // 2. Récupérer l'utilisateur associé à ce token de rafraîchissement
//     const user = await this.prisma.user.findUnique({
//         where: { id: payload.id },
//     });

//     if (!user || user.refreshToken !== refreshToken) {
//         throw new UnauthorizedException("Token de rafraîchissement invalide");
//     }

//     // 3. Générer un nouveau token d'accès
//     const newAccessToken = await this.jwtService.signAsync(
//         { sub: user.email, id: user.id, role: user.role },
//         { secret: process.env.JWT_SECRET, expiresIn: '15m' } // Token d'accès de courte durée
//     );

//     return { access_token: newAccessToken };
// } catch (error) {
//     console.error("Erreur lors du rafraîchissement du token :", error);
//     throw new ForbiddenException("Rafraîchissement du token échoué");
// }
// }
