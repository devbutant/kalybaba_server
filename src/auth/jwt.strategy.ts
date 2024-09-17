import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Request } from "express";
import { ExtractJwt, Strategy } from "passport-jwt";

const extractRefreshTokenFromCookies = (req: Request) => {
    let token = null;
    if (req && req.cookies) {
        token = req.cookies["jwt"];
    }
    console.log("token", token);
    return token;
};

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromExtractors([
                (req: Request) => extractRefreshTokenFromCookies(req),
            ]),

            ignoreExpiration: false,
            secretOrKey: process.env.JWT_SECRET_PASSPHRASE,
        });
    }

    async validate(payload: any) {
        console.log("payload", payload);

        return { userId: payload.sub, username: payload.username };
    }
}
