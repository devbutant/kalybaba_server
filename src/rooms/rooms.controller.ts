import {
    Body,
    Controller,
    Get,
    Param,
    Patch,
    Post,
    Request,
    UseGuards,
} from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { Room } from "@prisma/client";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";
import { RoomsService } from "./rooms.service";

@ApiTags("rooms")
@ApiBearerAuth()
@Controller("rooms")
@UseGuards(JwtAuthGuard)
export class RoomsController {
    constructor(private readonly roomsService: RoomsService) {}

    @Post("create")
    async createRoom(@Body() body: { name: string; userIds: string[] }) {
        return this.roomsService.createRoom(body.name, body.userIds);
    }

    @Get("list")
    async listRooms(@Request() req: any) {
        try {
            const userEmail = req.user.userId;
            const friends = await this.roomsService.getRooms(userEmail);
            return friends;
        } catch (error: unknown) {
            throw new Error(
                error instanceof Error ? error.message : "An error occurred"
            );
        }
    }

    @Get(":id")
    async getRoomById(@Param("id") id: string) {
        return this.roomsService.getRoomById(id);
    }

    @Patch("add-users")
    async addUsersToRoom(
        @Body() body: { roomId: string; userIds: string[] }
    ): Promise<Room> {
        const { roomId, userIds } = body;
        return this.roomsService.addUsersToRoom(roomId, userIds);
    }
}
