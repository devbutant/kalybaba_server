import { Module } from "@nestjs/common";
import { AdService } from "src/ad/ad.service";
import { PrismaService } from "../prisma.service";
import { UserController } from "./user.controller";
import { UserService } from "./user.service";

@Module({
    imports: [],
    controllers: [UserController],
    providers: [UserService, PrismaService, AdService],
    exports: [UserService],
})
export class UserModule {}
