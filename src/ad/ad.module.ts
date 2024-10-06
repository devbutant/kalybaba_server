import { Module } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { AdController } from "./ad.controller";
import { AdService } from "./ad.service";

@Module({
    controllers: [AdController],
    providers: [AdService, PrismaService],
})
export class AdModule {}
