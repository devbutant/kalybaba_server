import { Matches, MaxLength, MinLength } from "class-validator";
import { CreateAdDto } from "src/ad/dto/create-ad.dto";

import { IsString, ValidateNested } from "class-validator";

const min1numberAnd1SpecialRegex = /(?=.*\d)(?=.*[@$!%*?&])/;

export class UpdateUserDto {
    @IsString()
    name?: string;

    @MinLength(8)
    @MaxLength(20)
    @IsString()
    @Matches(min1numberAnd1SpecialRegex, {
        message:
            "Password must contain at least one number and one special character",
    })
    password?: string;

    @ValidateNested({ each: true })
    ads?: CreateAdDto[];

    @IsString()
    @MinLength(10)
    phone?: string;

    @IsString()
    @MinLength(2)
    @MaxLength(30)
    city?: string;
}
