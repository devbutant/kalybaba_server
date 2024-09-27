import {
    IsEmail,
    IsString,
    Matches,
    MaxLength,
    MinLength,
} from "class-validator";

const min1numberAnd1SpecialRegex = /(?=.*\d)(?=.*[@$!%*?&])/;

export class RegisterDto {
    @IsEmail()
    email: string;

    @IsString()
    name: string;

    @MinLength(8)
    @MaxLength(20)
    @IsString()
    @Matches(min1numberAnd1SpecialRegex, {
        message:
            "Password must contain at least one number and one special character",
    })
    password: string;

    @IsString()
    @MinLength(2)
    @MaxLength(30)
    city: string;
}
