import { IsNumber, IsString } from "class-validator";

export class PaginationDto {
    @IsString()
    id: string;

    @IsNumber()
    page: number;

    @IsNumber()
    perPage: number;
}
