import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { PrismaService } from "../prisma.service";
import { AdController } from "./ad.controller";
import { AdService } from "./ad.service";

@Module({
    controllers: [AdController],
    providers: [AdService, PrismaService],
    imports: [JwtModule],
})
export class AdModule {}
