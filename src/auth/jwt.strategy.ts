import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromExtractors([
                (req) => {
                    const token = req.cookies["access_token"];
                    return token ? token : null;
                },
            ]),
            ignoreExpiration: false,
            secretOrKey: process.env.JWT_SECRET_PASSPHRASE,
        });
    }

    async validate(payload: any) {
        return { id: payload.id, role: payload.role, email: payload.sub };
    }
}
