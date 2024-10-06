import { Module } from "@nestjs/common";
import { ResendModule } from "nestjs-resend";
import { MailService } from "./mail.service";

@Module({
    imports: [
        ResendModule.forRoot({
            apiKey: process.env.RESEND_API_KEY,
        }),
    ],
    providers: [MailService],
    exports: [MailService],
})
export class MailModule {}
