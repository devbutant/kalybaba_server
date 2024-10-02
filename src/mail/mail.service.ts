import { MailerService } from "@nestjs-modules/mailer";
import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class MailService {
    constructor(
        private readonly mailerService: MailerService,
        private readonly jwtService: JwtService
    ) {}

    async sendEmail(userEmail: string): Promise<string> {
        console.log("Sending mail to: ", userEmail);

        const token = this.jwtService.sign(
            { email: userEmail },
            {
                expiresIn: "600s",
            }
        );

        const magicLink = `https://${process.env.CLIENT_URL}/confirmation-email?access-token=${token}`;

        await this.mailerService.sendMail({
            to: userEmail,
            from: "noreply@kalybaba.com",
            subject: "Ton lien de confirmation ✔",
            template: "welcome",
            context: {
                magicLink,
            },
        });

        console.log("Mail sent to: ", userEmail);
        return "Mail sent!";
    }
}
