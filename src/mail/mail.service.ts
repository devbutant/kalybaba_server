import { MailerService } from "@nestjs-modules/mailer";
import { Injectable } from "@nestjs/common";
import { PreRegisterDto } from "src/auth/dto/register.dto";

@Injectable()
export class MailService {
    constructor(private readonly mailerService: MailerService) {}

    async sendEmail(userEmail: PreRegisterDto, token: string): Promise<string> {
        console.log("Sending mail to: ", userEmail);

        const magicLink = `${process.env.CLIENT_URL}/confirmation-email/${token}`;

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
