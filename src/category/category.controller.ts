import { Controller, Get, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";
import { CategoryService } from "./category.service";

@ApiTags("categories")
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller("categories")
export class CategoryController {
    constructor(private readonly categoryService: CategoryService) {}

    @Get()
    findAll() {
        return this.categoryService.categories();
    }
}
