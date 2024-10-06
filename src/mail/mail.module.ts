import { MailerModule } from "@nestjs-modules/mailer";
import { HandlebarsAdapter } from "@nestjs-modules/mailer/dist/adapters/handlebars.adapter";
import { Module } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { MailController } from "./mail.controller";
import { MailService } from "./mail.service";

@Module({
    imports: [
        MailerModule.forRoot({
            transport: {
                host: "smtp.gmail.com",
                port: process.env.NODE_ENV === "production" ? 465 : 587,
                secure: process.env.NODE_ENV === "production",
                from: "noreply@kalybaba.com",
                auth: {
                    user: process.env.MAIL_USER,
                    pass: process.env.MAIL_PASS,
                },
            },
            defaults: {
                from: "noreply@kalybaba.com",
            },
            preview: true,
            template: {
                dir: process.cwd() + "/src/mail/templates",
                adapter: new HandlebarsAdapter(), // or new PugAdapter() or new EjsAdapter()
                options: {
                    strict: true,
                },
            },
        }),
    ],
    controllers: [MailController],
    providers: [MailService, JwtService],
    exports: [],
})
export class MailModule {}
