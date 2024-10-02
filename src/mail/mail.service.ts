import { MailerService } from "@nestjs-modules/mailer";
import { Injectable } from "@nestjs/common";

@Injectable()
export class MailService {
    constructor(private readonly mailerService: MailerService) {}

    async sendEmail(userEmail: string): Promise<string> {
        this.mailerService.sendMail({
            to: userEmail,
            from: "noreply@kalybaba.com",
            subject: "Testing Nest MailerModule ✔",
            text: "Bienvenue sur Kalybaba! Merci de confirmer votre adresse email.",
            html: "<b>Bienvenue sur Kalybaba! Merci de confirmer votre adresse email.</b>",
        });
        console.log("Mail sent to: ", userEmail);

        return "Mail sent!";
    }
}
