import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Patch,
    Post,
    Req,
    UseGuards,
} from "@nestjs/common";
import { Request } from "express";

import { ApiTags } from "@nestjs/swagger";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";
import { AdService } from "./ad.service";
import { CreateAdDto } from "./dto/create-ad.dto";
import { UpdateAdDto } from "./dto/update-ad.dto";

@ApiTags("ads")
@UseGuards(JwtAuthGuard)
@Controller("ads")
export class AdController {
    constructor(private readonly adService: AdService) {}

    @Post()
    create(@Body() createAdDto: CreateAdDto) {
        return this.adService.createAd(createAdDto);
    }

    @Get()
    findAll(@Req() request: Request) {
        return this.adService.ads();
    }

    @Get(":id")
    findOne(@Param("id") id: string) {
        return this.adService.ad(id);
    }

    @Patch(":id")
    update(@Param("id") id: string, @Body() updateAdDto: UpdateAdDto) {
        return this.adService.updateAd(id, updateAdDto);
    }

    @Delete(":id")
    remove(@Param("id") id: string) {
        return this.adService.removeAd(id);
    }
}
