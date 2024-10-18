import { Module } from "@nestjs/common";
import { AdService } from "src/ad/ad.service";
import { AuthService } from "src/auth/auth.service";
import { MailModule } from "src/mail/mail.module";
import { PrismaService } from "../prisma/prisma.service";
import { UserController } from "./user.controller";
import { UserService } from "./user.service";

@Module({
    imports: [MailModule],
    controllers: [UserController],
    providers: [UserService, PrismaService, AdService, AuthService],
    exports: [UserService],
})
export class UserModule {}
