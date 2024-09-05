import {
    Body,
    Controller,
    Delete,
    Get,
    Headers,
    Param,
    Patch,
    Post,
    UnauthorizedException,
    UseGuards,
} from "@nestjs/common";

import { JwtService } from "@nestjs/jwt";
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
    constructor(
        private readonly adService: AdService,
        private jwtService: JwtService
    ) {}

    @Post()
    create(@Body() createAdDto: CreateAdDto) {
        return this.adService.createAd(createAdDto);
    }

    @Get()
    findAll(@Headers("authorization") authorizationHeader: string) {
        if (!authorizationHeader) {
            throw new UnauthorizedException("Authorization header is missing");
        }

        const token = authorizationHeader.replace("Bearer ", "");
        try {
            const decodedToken = this.jwtService.verify(token);
            return this.adService.ads(decodedToken.id);
        } catch (error) {
            throw new UnauthorizedException("Invalid token");
        }
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
