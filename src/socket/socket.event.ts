import { JwtService } from "@nestjs/jwt";
import {
    ConnectedSocket,
    MessageBody,
    SubscribeMessage,
    WebSocketGateway,
    WebSocketServer,
} from "@nestjs/websockets";
import { Server, Socket } from "socket.io";
import { UserService } from "../user/user.service";

@WebSocketGateway({
    cors: {
        origin: process.env.CLIENT_URL,
        methods: ["GET", "POST"],
    },
})
export class SocketEvent {
    @WebSocketServer()
    server: Server;

    private userSocketMap = new Map<string, string>(); // Map for storing userId to socketId

    constructor(
        private readonly userService: UserService,
        private jwtService: JwtService
    ) {}

    @SubscribeMessage("authenticate")
    async handleAuthentication(
        @MessageBody() authToken: string,
        @ConnectedSocket() client: Socket
    ) {
        try {
            // Verify token and get userId
            const payload = this.jwtService.verify(authToken);
            const userId = payload.id;

            // Check if user exists
            const user = await this.userService.user({ id: userId });

            if (user) {
                this.userSocketMap.set(userId, client.id);
                console.log(
                    `User ${userId} connected with socket ID ${client.id}`
                );
                // Emit success event to client
                client.emit("authenticated");
            } else {
                client.disconnect();
            }
        } catch (error) {
            console.error("Authentication failed:", error);
            client.disconnect();
        }
    }

    @SubscribeMessage("message")
    async handleEvent(
        @MessageBody() data: string,
        @ConnectedSocket() client: Socket
    ): Promise<string> {
        const userId = Array.from(this.userSocketMap.entries()).find(
            ([id, socketId]) => socketId === client.id
        )?.[0];

        if (userId) {
            const user = await this.userService.user({ id: userId });
            if (user) {
                this.server.emit("message", user.name, userId, data);
            } else {
                console.log("User not found for ID:", userId);
            }
        } else {
            console.log("Socket ID not associated with any user");
        }

        return data;
    }
}
