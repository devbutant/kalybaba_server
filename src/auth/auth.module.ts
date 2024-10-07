import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { AdModule } from "src/ad/ad.module";
import { MailModule } from "src/mail/mail.module";
import { PrismaService } from "src/prisma/prisma.service";
import { UserModule } from "../user/user.module";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { JwtStrategy } from "./jwt.strategy";
import { LocalStrategy } from "./local.strategy";

@Module({
    imports: [
        UserModule,
        AdModule,

        PassportModule,
        JwtModule.register({
            global: true,
            secret: process.env.JWT_SECRET_PASSPHRASE,
            signOptions: { expiresIn: "6000s" },
        }),

        MailModule,
    ],

    controllers: [AuthController],
    providers: [AuthService, LocalStrategy, JwtStrategy, PrismaService],
    exports: [AuthService],
})
export class AuthModule {}
