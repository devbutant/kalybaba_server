import { MailerModule } from "@nestjs-modules/mailer";
import { Module } from "@nestjs/common";
import { MailService } from "./mail.service";

@Module({
    imports: [
        MailerModule.forRoot({
            transport: `smtps://${process.env.USER_EMAIL}:${process.env.PASSWORD_USER_EMAIL}@smtp.gmail.com`,
            defaults: {
                from: '"nest-modules" <modules@nestjs.com>',
            },
        }),
    ],
    providers: [MailService],
    exports: [MailService],
})
export class MailModule {}
