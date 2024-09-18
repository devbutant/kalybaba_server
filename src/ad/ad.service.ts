import { Injectable } from "@nestjs/common";
import { Ad, Prisma } from "@prisma/client";
import { PrismaService } from "../prisma.service";
import { AdServiceInterface } from "./ad.interface";
import { CreateAdDto } from "./dto/create-ad.dto";
import { UpdateAdDto } from "./dto/update-ad.dto";

@Injectable()
export class AdService implements AdServiceInterface {
    constructor(private prisma: PrismaService) {}

    async createAd(createAdDto: CreateAdDto) {
        return this.prisma.ad.create({
            data: createAdDto as Prisma.AdCreateInput,
            include: {
                type: true,
                category: true,
            },
        });
    }

    async ads(): Promise<Ad[]> {
        return this.prisma.ad.findMany({
            include: {
                type: true,
                category: true,
                author: true,
            },
        });
    }

    async getAdsByUser(id: string): Promise<Ad[]> {
        return this.prisma.ad.findMany({
            where: { authorId: id },
            include: {
                type: true,
                category: true,
                author: true,
            },
        });
    }

    async ad(id: string): Promise<Ad> {
        return this.prisma.ad.findUnique({
            where: { id: id },
            include: {
                type: true,
                category: true,
                author: true,
            },
        });
    }

    async updateAd(id: string, updateAdDto: UpdateAdDto): Promise<Ad> {
        return this.prisma.ad.update({
            where: { id: id },
            include: {
                type: true,
                category: true,
            },
            data: updateAdDto as Prisma.AdUpdateInput,
        });
    }

    async removeAd(id: string): Promise<Ad> {
        return this.prisma.ad.delete({
            where: { id: id },
            include: {
                type: true,
                category: true,
            },
        });
    }
}
