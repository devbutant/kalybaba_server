import {
    IsArray,
    IsDate,
    IsEnum,
    IsNumber,
    IsString,
    MaxLength,
    MinLength,
} from "class-validator";

import { CategoryEnum, TypeEnum } from "@prisma/client";
import { IsCuid } from "../../../src/decorators/IsCUID";

export class CreateAdDto {
    @IsString()
    @MinLength(2)
    @MaxLength(30)
    title: string;

    @IsString()
    @MinLength(2)
    @MaxLength(200)
    description: string;

    @IsArray()
    photos: string[];

    @IsString()
    @MinLength(2)
    @MaxLength(100)
    city: string;

    @IsNumber()
    price: number;

    @IsCuid() // Ce décorateur ne sert peut-être à rien ici (vérifie si c'est un CUID ou pas, à voir)
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
