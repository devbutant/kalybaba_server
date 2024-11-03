import {
    BadRequestException,
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Patch,
    Post,
    Query,
    Request,
    Res,
    UploadedFiles,
    UseGuards,
    UseInterceptors,
} from "@nestjs/common";
import { FilesInterceptor } from "@nestjs/platform-express";

import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";
import { AdService } from "./ad.service";
import { UpdateAdDto } from "./dto/update-ad.dto";

import {
    IsDate,
    IsEnum,
    IsString,
    MaxLength,
    MinLength,
} from "class-validator";

import { CategoryEnum, TypeEnum } from "@prisma/client";

import { Response } from "express";
import path from "path";

export class CreateAdDtoWithPriceInString {
    @IsString()
    @MinLength(2)
    @MaxLength(30)
    title: string;

    @IsString()
    @MinLength(2)
    @MaxLength(200)
    description: string;

    @IsString()
    @MinLength(2)
    @MaxLength(100)
    city: string;

    // photos: Express.Multer.File[];

    @IsString()
    price: string;

    authorId: string;
    author: { connect: { id: string } };

    @IsEnum(TypeEnum)
    typeEnum: TypeEnum;

    @IsEnum(CategoryEnum)
    categoryEnum: CategoryEnum;

    @IsDate()
    createdAt: Date = new Date(); // Valeur par défaut : Date actuelle

    @IsDate()
    updatedAt: Date = new Date(); // Valeur par défaut : Date actuelle
}

@ApiTags("ads")
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller("ads")
export class AdController {
    constructor(private readonly adService: AdService) {}

    @Post()
    @UseInterceptors(FilesInterceptor("photos"))
    create(
        @Body() createAdDto: CreateAdDtoWithPriceInString,
        @UploadedFiles() files: Express.Multer.File[]
    ) {
        const priceAsNumber = parseFloat(createAdDto.price);

        if (isNaN(priceAsNumber)) {
            throw new BadRequestException(
                "Le prix doit être un nombre valide."
            );
        }

        const transformedDto = {
            ...createAdDto,
            price: priceAsNumber,
        };

        return this.adService.createAd(transformedDto, files);
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

    @Get("uploads/:fileDirectory/:filename")
    async getPhoto(
        @Param("fileDirectory") fileDirectory: string,
        @Param("filename") filename: string,
        @Res() res: Response
    ) {
        const filePath = path.join(
            __dirname,
            "../../../uploads",
            fileDirectory,
            filename
        );
        console.log(filePath);

        return res.sendFile(filePath);
    }
}
