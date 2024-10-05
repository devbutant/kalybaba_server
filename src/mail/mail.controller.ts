import { Controller } from "@nestjs/common";
// import { PreRegisterDto } from "src/auth/dto/register.dto";
// import { MailService } from "./mail.service";

@Controller("mail")
export class MailController {
    // constructor(private readonly mailService: MailService) {}
    // @Get()
    // async sendEmail(
    //     userRegisterData: PreRegisterDto,
    //     token: string
    // ): Promise<string> {
    //     const sendMailResponse = await this.mailService.sendEmail(
    //         userRegisterData,
    //         token
    //     );
    //     console.log({ msg: "RES", sendMailResponse });
    //     return "Mail sent!";
    // }
}
