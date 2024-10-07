import { Injectable } from "@nestjs/common";
import { ResendService } from "nestjs-resend";
import { PreRegisterDto } from "src/auth/dto/register.dto";

@Injectable()
export class MailService {
    constructor(private readonly resendService: ResendService) {}

    public async sendEmail(user: PreRegisterDto, token: string): Promise<any> {
        const sendingRes = await this.resendService.send({
            from: "onboarding@resend.dev",
            to: process.env.MAIL_USER, // TODO changer pour user.email
            subject: "Ton lien de confirmation ✔",
            text:
                "Hello, world! Voici votre token: " +
                token +
                ". Cliquez sur ce lien pour confirmer votre email: http://localhost:5173/auth/confirmation-email/" +
                token,
        });

        if (sendingRes.error !== null) {
            return {
                error: sendingRes.error
                    ? sendingRes.error
                    : "An unknown error occurred.",
            };
        }

        return {
            message:
                "Email successfully sent to " +
                user.email +
                " with the token: " +
                token,
        };
    }
}
