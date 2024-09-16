import { Module, RequestMethod } from "@nestjs/common";
import { MiddlewareConsumer } from "@nestjs/common/interfaces";
import { ConfigModule } from "@nestjs/config";
import { AdModule } from "./ad/ad.module";
import { AppController } from "./app.controller";
import { AuthModule } from "./auth/auth.module";
import { CookieLoggerMiddleware } from "./cookie.middleware";
import { FriendsModule } from "./friends/friends.module";
import { RoomsModule } from "./rooms/rooms.module";
import { SocketModule } from "./socket/socket.module";
import { UserModule } from "./user/user.module";

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
        RoomsModule,
    ],
    controllers: [AppController],
    providers: [],
})
export class AppModule {
    configure(consumer: MiddlewareConsumer) {
        consumer
            .apply(CookieLoggerMiddleware)
            .forRoutes({ path: "*", method: RequestMethod.ALL });
    }
}
