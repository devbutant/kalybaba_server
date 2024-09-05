import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { AdService } from "src/ad/ad.service";
import { LoggerMiddleware } from "../common/middlewares/logger.middleware";
import { PrismaService } from "../prisma.service";
import { UserController } from "./user.controller";
import { UserService } from "./user.service";

@Module({
    providers: [UserService, PrismaService, AdService],
    controllers: [UserController],
    exports: [UserService],
    imports: [],
})
export class UserModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(LoggerMiddleware).forRoutes("users");
    }
}
