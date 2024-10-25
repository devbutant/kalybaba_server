import { Injectable } from "@nestjs/common";
import { PaginatorTypes, paginator } from "@nodeteam/nestjs-prisma-pagination";
import { Ad, Prisma } from "@prisma/client";
import { PrismaService } from "../prisma/prisma.service";
import { AdServiceInterface } from "./ad.interface";
import { CreateAdDto } from "./dto/create-ad.dto";
import { PaginationDto } from "./dto/page-dto";
import { UpdateAdDto } from "./dto/update-ad.dto";

const paginate: PaginatorTypes.PaginateFunction = paginator({ perPage: 10 });

@Injectable()
export class AdService implements AdServiceInterface {
    constructor(private prisma: PrismaService) {}

    async createAd(createAdDto: CreateAdDto) {
        return this.prisma.ad.create({
            data: createAdDto as Prisma.AdCreateInput,
        });
    }

    async ads({
        page = 1,
        perPage = 10,
    }: {
        page?: number;
        perPage?: number;
    }): Promise<PaginatorTypes.PaginatedResult<Ad>> {
        return paginate(
            this.prisma.ad,
            {
                include: {
                    author: true,
                },
                orderBy: {
                    createdAt: "desc",
                },
            },
            {
                page,
                perPage,
            }
        );
    }

    async getMyAds(
        pagination: PaginationDto
    ): Promise<PaginatorTypes.PaginatedResult<Ad>> {
        const { id, page, perPage } = pagination;

        return paginate(
            this.prisma.ad,
            {
                where: { authorId: id },
                include: {
                    author: true,
                },
                orderBy: {
                    createdAt: "desc",
                },
            },
            {
                page,
                perPage,
            }
        );
    }

    async ad(id: string): Promise<Ad> {
        return this.prisma.ad.findUnique({
            where: { id: id },
            include: {
                author: true,
            },
        });
    }

    async updateAd(id: string, updateAdDto: UpdateAdDto): Promise<Ad> {
        return this.prisma.ad.update({
            where: { id: id },
            include: {
                author: true,
            },
            data: updateAdDto as Prisma.AdUpdateInput,
        });
    }

    async removeAd(id: string): Promise<Ad> {
        return this.prisma.ad.delete({
            where: { id: id },
            include: {
                author: true,
            },
        });
    }
}
