import { Controller, Get } from "@nestjs/common";
import { MailService } from "./mail.service";

@Controller("mail")
export class MailController {
    constructor(private readonly mailService: MailService) {}

    @Get()
    async sendEmail(userEmail: string): Promise<string> {
        await this.mailService.sendEmail(userEmail);
        return "Mail sent!";
    }
}
