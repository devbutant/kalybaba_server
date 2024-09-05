import { Module } from "@nestjs/common";
import { UserModule } from "src/user/user.module";
import { SocketEvent } from "./socket.event";

@Module({
    providers: [SocketEvent],
    imports: [UserModule],
})
export class SocketModule {}
