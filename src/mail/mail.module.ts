import { MailerModule } from "@nestjs-modules/mailer";
import { HandlebarsAdapter } from "@nestjs-modules/mailer/dist/adapters/handlebars.adapter";
import { Module } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { google } from "googleapis";
import { MailController } from "./mail.controller";
import { MailService } from "./mail.service";

const OAuth2 = google.auth.OAuth2;

async function getAccessToken() {
    const oauth2Client = new OAuth2(
        process.env.OAUTH_CLIENT_ID,
        process.env.OAUTH_CLIENT_SECRET,
        process.env.OAUTH_REDIRECT_URL
    );

    oauth2Client.setCredentials({
        refresh_token: process.env.OAUTH_REFRESH_TOKEN,
    });
    try {
        const accessTokenResponse = await oauth2Client.getAccessToken();
        if (!accessTokenResponse?.token) {
            throw new Error("Failed to retrieve access token.");
        }
        return accessTokenResponse.token;
    } catch (error) {
        console.log("Error retrieving access token:", error);
        throw new Error("OAuth2 Access Token Error");
    }
}

@Module({
    imports: [
        MailerModule.forRootAsync({
            useFactory: async () => {
                const accessToken = await getAccessToken();
                return {
                    transport: {
                        service: "gmail",
                        auth: {
                            type: "OAuth2",
                            user: process.env.MAIL_USER,
                            clientId: process.env.OAUTH_CLIENT_ID,
                            clientSecret: process.env.OAUTH_CLIENT_SECRET,
                            refreshToken: process.env.OAUTH_REFRESH_TOKEN,
                            accessToken, // Utilise le token récupéré
                        },
                    },
                    defaults: {
                        from: "noreply@kalybaba.com",
                    },
                    template: {
                        dir: process.cwd() + "/src/mail/templates",
                        adapter: new HandlebarsAdapter(),
                        options: {
                            strict: true,
                        },
                    },
                };
            },
        }),
    ],
    controllers: [MailController],
    providers: [MailService, JwtService],
    exports: [],
})
export class MailModule {}
