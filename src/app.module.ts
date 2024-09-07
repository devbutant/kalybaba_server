import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { AdModule } from "./ad/ad.module";
import { AppController } from "./app.controller";
import { AuthModule } from "./auth/auth.module";
import { UserModule } from "./user/user.module";
import { SocketModule } from './socket/socket.module';
import { FriendsModule } from './friends/friends.module';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true, // Permet de rendre la config globale, par exemple les variables d'environnement partout où le ConfigModule sera importé.
        }),
        UserModule,
        AdModule,
        AuthModule,
        SocketModule,
        FriendsModule,
    ],
    controllers: [AppController],
    providers: [],
})
export class AppModule {}
