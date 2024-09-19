import { Module } from "@nestjs/common";
import { PrismaService } from "src/prisma.service";
import { TypeController } from "./type.controller";
import { TypeService } from "./type.service";

@Module({
    providers: [TypeService, PrismaService],
    controllers: [TypeController],
})
export class TypeModule {}
