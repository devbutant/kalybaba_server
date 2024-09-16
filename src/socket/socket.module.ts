import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { UserModule } from "src/user/user.module";
import { SocketEvent } from "./socket.event";

@Module({
    providers: [SocketEvent],
    imports: [UserModule, JwtModule],
})
export class SocketModule {}
