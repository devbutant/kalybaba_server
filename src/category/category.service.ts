import { Injectable } from "@nestjs/common";
import { Category } from "@prisma/client";
import { PrismaService } from "../prisma.service";
import { CategoryServiceInterface } from "./category.interface";

@Injectable()
export class CategoryService implements CategoryServiceInterface {
    constructor(private prisma: PrismaService) {}

    async categories(): Promise<Category[]> {
        return this.prisma.category.findMany();
    }
}
