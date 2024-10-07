import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { AuthModule } from "./auth/auth.module";
import { PrismaModule } from "./prisma/prisma.module";
import { PrismaService } from "./prisma/prisma.service";

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true, // Permet de rendre la config globale, par exemple les variables d'environnement partout où le ConfigModule sera importé.
        }),
        AuthModule,
        PrismaModule,
    ],
    controllers: [AppController],
    providers: [AppService, PrismaService], // TODO: voir si nécessaire
    exports: [PrismaService], // TODO: voir si nécessaire
})
export class AppModule {}
