import { PartialType } from "@nestjs/mapped-types";
import { CategoryEnum, TypeEnum } from "@prisma/client";
import {
    IsEnum,
    IsNumber,
    IsString,
    MaxLength,
    MinLength,
} from "class-validator";
import { CreateAdDto } from "./create-ad.dto";

export class UpdateAdDto extends PartialType(CreateAdDto) {
    @IsString()
    title: string;

    @IsString()
    @MinLength(2)
    @MaxLength(200)
    description?: string;

    @IsString()
    @MinLength(2)
    @MaxLength(100)
    city: string;

    @IsNumber()
    price: number;

    @IsEnum(TypeEnum)
    typeEnum: TypeEnum;

    @IsEnum(CategoryEnum)
    categoryEnum: CategoryEnum;
}
