import { Injectable } from "@nestjs/common";
import { PaginatorTypes, paginator } from "@nodeteam/nestjs-prisma-pagination";
import { Ad, Prisma } from "@prisma/client";
import fs from "fs";
import { PrismaService } from "../prisma/prisma.service";
import { AdServiceInterface } from "./ad.interface";
import { CreateAdDto } from "./dto/create-ad.dto";
import { PaginationDto } from "./dto/page-dto";
import { UpdateAdDto } from "./dto/update-ad.dto";

const paginate: PaginatorTypes.PaginateFunction = paginator({ perPage: 10 });

@Injectable()
export class AdService implements AdServiceInterface {
    constructor(private prisma: PrismaService) {}

    async createAd(
        createAdDto: CreateAdDto,
        files: Express.Multer.File[]
    ): Promise<string> {
        console.log("data from service ", createAdDto, files);

        const fileNames: string[] = [];
        for (const file of files) {
            // Vous devez sauvegarder le fichier à un endroit dans votre serveur
            // Cela peut être dans un dossier local ou dans un service de stockage
            const filePath = `uploads/${file.originalname}`;
            await fs.promises.writeFile(filePath, file.buffer);
            fileNames.push(filePath);
        }

        const res = await this.prisma.ad.create({
            data: createAdDto as Prisma.AdCreateInput,
            // {
            //     ...(createAdDto as Prisma.AdCreateInput),
            //     // photos: {
            //     //     set: fileNames,
            //     // },
            // },
        });
        console.log(res);
        return "Ad created";
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
