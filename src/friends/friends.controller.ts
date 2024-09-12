import {
    Body,
    Controller,
    Delete,
    Get,
    Post,
    Request,
    UseGuards,
} from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";
import { FriendsService } from "./friends.service";

@ApiTags("friends")
@ApiBearerAuth()
@Controller("friends")
@UseGuards(JwtAuthGuard)
export class FriendsController {
    constructor(private readonly friendsService: FriendsService) {}

    @Post()
    async addFriend(@Body() body: { userId: string; friendId: string }) {
        return this.friendsService.addFriend(body.userId, body.friendId);
    }

    @Get()
    async listFriends(@Request() req: any) {
        try {
            const userEmail = req.user.userId;
            const friends = await this.friendsService.getFriends(userEmail);
            return friends;
        } catch (error: unknown) {
            throw new Error(
                error instanceof Error ? error.message : "An error occurred"
            );
        }
    }

    @Delete()
    async removeFriend(@Body() body: { userId: string; friendId: string }) {
        return this.friendsService.removeFriend(body.userId, body.friendId);
    }
}
