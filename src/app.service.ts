import { MailerService } from "@nestjs-modules/mailer";
import { Injectable } from "@nestjs/common";

@Injectable()
export class AppService {
    constructor(private readonly mailerService: MailerService) {}

    getHello(): string {
        return "Hello World!";
    }

    async sendEmail() {
        console.log("sendEmail");
        this.mailerService
            .sendMail({
                to: "user-kalybaba@mailinator.com",
                from: "noreply@kalybaba.com",
                subject: "Testing Nest MailerModule ✔",
                text: "Bienvenue sur Kalybaba! Merci de confirmer votre adresse email.",
                html: "<b>Bienvenue sur Kalybaba! Merci de confirmer votre adresse email.</b>",
            })
            .then((success) => {
                console.log(success);
            })
            .catch((err) => {
                console.log(err);
            });
    }
}
