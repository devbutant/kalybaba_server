import { MailerModule } from "@nestjs-modules/mailer";
import { Module } from "@nestjs/common";
import { MailController } from './mail.controller';
import { MailService } from './mail.service';

@Module({
    imports: [
        MailerModule.forRoot({
            transport: {
                host: "smtp.gmail.com",
                port: 587,
                secure: false,
                from: "noreply@kalybaba.com",
                auth: {
                    user: process.env.MAIL_USER,
                    pass: process.env.MAIL_PASS,
                },
            },
            defaults: {
                from: "noreply@kalybaba.com",
            },
        }),
    ],
    controllers: [MailController],
    providers: [MailService],
    exports: [],
})
export class MailModule {}
