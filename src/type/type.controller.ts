import { Controller, Get, UseGuards } from "@nestjs/common";

import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";
import { TypeService } from "./type.service";

@ApiTags("types")
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller("types")
export class TypeController {
    constructor(private readonly typeService: TypeService) {}

    @Get()
    findAll() {
        return this.typeService.types();
    }
}
