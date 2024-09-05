import { PartialType } from "@nestjs/mapped-types";
import { IsString, MaxLength, MinLength } from "class-validator";
import { CreateAdDto } from "./create-ad.dto";

export class UpdateAdDto extends PartialType(CreateAdDto) {
    @IsString()
    title: string;

    @IsString()
    @MinLength(2)
    @MaxLength(200)
    description?: string;
}
