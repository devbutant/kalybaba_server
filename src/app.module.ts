import { MailerModule } from "@nestjs-modules/mailer";
import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { AdModule } from "./ad/ad.module";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { AuthModule } from "./auth/auth.module";
import { FriendsModule } from "./friends/friends.module";
import { RoomsModule } from "./rooms/rooms.module";
import { SocketModule } from "./socket/socket.module";
import { UserModule } from "./user/user.module";

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true, // Permet de rendre la config globale, par exemple les variables d'environnement partout où le ConfigModule sera importé.
        }),
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
        UserModule,
        AdModule,
        AuthModule,
        SocketModule,
        FriendsModule,
        RoomsModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
