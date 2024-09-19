import {
    IsDate,
    IsNumber,
    IsString,
    MaxLength,
    MinLength,
} from "class-validator";

export class CreateAdDto {
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
    address: string;

    @IsNumber()
    price: number;

    authorId: string;
    author: { connect: { id: string } };

    categoryId: string;
    category: { connect: { id: string } };

    typeId: string;
    type: { connect: { id: string } };

    @IsDate()
    createdAt: Date = new Date(); // Valeur par défaut : Date actuelle

    @IsDate()
    updatedAt: Date = new Date(); // Valeur par défaut : Date actuelle
}
