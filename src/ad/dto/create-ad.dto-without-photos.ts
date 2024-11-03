import {
    IsDate,
    IsEnum,
    IsString,
    MaxLength,
    MinLength,
} from "class-validator";

import { CategoryEnum, TypeEnum } from "@prisma/client";
import { IsCuid } from "../../decorators/IsCUID";

export class CreateAdDtoWithoutPhotos {
    @IsString()
    @MinLength(2)
    @MaxLength(30)
    title: string;

    @IsString()
    @MinLength(2)
    @MaxLength(200)
    description: string;

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
