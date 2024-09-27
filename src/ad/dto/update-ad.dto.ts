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
    @MinLength(5)
    @MaxLength(50)
    title: string;

    @IsString()
    @MinLength(20)
    @MaxLength(200)
    description?: string;

    @IsNumber()
    price: number;

    @IsString()
    @MinLength(2)
    @MaxLength(100)
    city: string;

    @IsEnum(TypeEnum)
    typeEnum: TypeEnum;

    @IsEnum(CategoryEnum)
    categoryEnum: CategoryEnum;
}
