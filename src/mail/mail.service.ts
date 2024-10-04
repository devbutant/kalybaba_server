import { MailerService } from "@nestjs-modules/mailer";
import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { PreRegisterDto } from "src/auth/dto/register.dto";

@Injectable()
export class MailService {
    constructor(
        private readonly mailerService: MailerService,
        private readonly jwtService: JwtService
    ) {}

    async sendEmail(userEmail: PreRegisterDto): Promise<string> {
        console.log("Sending mail to: ", userEmail);

        const token = this.jwtService.sign(
            { email: userEmail.email },
            {
                expiresIn: "600s", // 10 minutes
            }
        );

        const magicLink = `https://${process.env.CLIENT_URL}/confirmation-email?access-token=${token}`;

        await this.mailerService.sendMail({
            to: userEmail.email,
            from: "noreply@kalybaba.com",
            subject: "Ton lien de confirmation ✔",
            template: "welcome",
            context: {
                magicLink,
            },
        });

        return "Lien magic envoyé, tu as 10 minutes pour valider ton compte en cliquant dessus, sinon : recommence ton inscription!";
    }
}
