import { Injectable } from "@nestjs/common";
import { Type } from "@prisma/client";
import { PrismaService } from "../prisma.service";
import { TypeServiceInterface } from "./type.interface";

@Injectable()
export class TypeService implements TypeServiceInterface {
    constructor(private prisma: PrismaService) {}

    async types(): Promise<Type[]> {
        return this.prisma.type.findMany();
    }
}
