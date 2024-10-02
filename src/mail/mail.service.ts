import { MailerService } from "@nestjs-modules/mailer";
import { Injectable } from "@nestjs/common";

@Injectable()
export class MailService {
    constructor(private readonly mailerService: MailerService) {}

    async sendEmail(): Promise<string> {
        console.log("wep");

        this.mailerService.sendMail({
            to: "user-kalybaba@mailinator.com",
            from: "noreply@kalybaba.com",
            subject: "Testing Nest MailerModule ✔",
            text: "Bienvenue sur Kalybaba! Merci de confirmer votre adresse email.",
            html: "<b>Bienvenue sur Kalybaba! Merci de confirmer votre adresse email.</b>",
        });

        return "Mail sent!";
    }
}
