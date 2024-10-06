import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { AdModule } from "./ad/ad.module";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { AuthModule } from "./auth/auth.module";

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true, // Permet de rendre la config globale, par exemple les variables d'environnement partout où le ConfigModule sera importé.
        }),
        AdModule,
        AuthModule,
    ],
    controllers: [AppController],
    providers: [AppService], // TODO: voir si nécessaire
    exports: [],
})
export class AppModule {}
