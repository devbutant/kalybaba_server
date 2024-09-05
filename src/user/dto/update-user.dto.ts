import { Matches, MaxLength, MinLength } from "class-validator";
import { CreateAdDto } from "src/ad/dto/create-ad.dto";

import { IsString, ValidateNested } from "class-validator";

export class UpdateUserDto {
    @IsString()
    name: string;

    @MinLength(8)
    @MaxLength(20)
    @Matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
        {
            message:
                "Le mot de passe doit contenir au moins une lettre majuscule, une lettre minuscule, un chiffre et un caractère spécial",
        }
    )
    password: string;

    @ValidateNested({ each: true })
    ads?: CreateAdDto[];
}
