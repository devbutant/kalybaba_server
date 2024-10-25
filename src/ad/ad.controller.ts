import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Patch,
    Post,
    Query,
    Request,
    UseGuards,
} from "@nestjs/common";

import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";
import { AdService } from "./ad.service";
import { CreateAdDto } from "./dto/create-ad.dto";
import { UpdateAdDto } from "./dto/update-ad.dto";

@ApiTags("ads")
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller("ads")
export class AdController {
    constructor(private readonly adService: AdService) {}

    @Post()
    create(@Body() createAdDto: CreateAdDto) {
        return this.adService.createAd(createAdDto);
    }

    @Get()
    async findAll(
        @Query("page") page: number = 1,
        @Query("perPage") perPage: number = 10
    ) {
        return this.adService.ads({ page, perPage });
    }

    @Get("current-user")
    findMyAds(
        @Request() req,
        @Query("page") page: number = 1,
        @Query("perPage") perPage: number = 10
    ) {
        const id = req.user.id;

        return this.adService.getMyAds({ id, page, perPage });
    }

    @Get("/:id")
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
