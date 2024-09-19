import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { AdModule } from "./ad/ad.module";
import { AppController } from "./app.controller";
import { AuthModule } from "./auth/auth.module";
import { CategoryModule } from "./category/category.module";
import { FriendsModule } from "./friends/friends.module";
import { RoomsModule } from "./rooms/rooms.module";
import { SocketModule } from "./socket/socket.module";
import { TypeModule } from "./type/type.module";
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
        TypeModule,
        CategoryModule,
    ],
    controllers: [AppController],
    providers: [],
})
export class AppModule {}
