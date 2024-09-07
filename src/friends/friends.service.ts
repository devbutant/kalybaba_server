import { Injectable } from "@nestjs/common";
import { User } from "@prisma/client";
import { PrismaService } from "src/prisma.service";

@Injectable()
export class FriendsService {
    constructor(private readonly prisma: PrismaService) {}

    async addFriend(userId: string, friendId: string): Promise<User> {
        const user = await this.prisma.user.findUnique({
            where: { id: userId },
        });
        const friend = await this.prisma.user.findUnique({
            where: { id: friendId },
        });

        if (!user || !friend) {
            throw new Error("User or friend not found");
        }

        // Add Friend to User's friends list
        await this.prisma.user.update({
            where: { id: userId },
            data: {
                friends: {
                    connect: { id: friendId },
                },
            },
        });

        // Add User to Friend's friends list
        await this.prisma.user.update({
            where: { id: friendId },
            data: {
                friends: {
                    connect: { id: userId },
                },
            },
        });

        const updatedFriend = await this.prisma.user.findUnique({
            where: { id: friendId },
            include: { friends: true },
        });

        return updatedFriend;
    }

    async removeFriend(userId: string, friendId: string): Promise<User> {
        const user = await this.prisma.user.findUnique({
            where: { id: userId },
        });
        const friend = await this.prisma.user.findUnique({
            where: { id: friendId },
        });

        if (!user || !friend) {
            throw new Error("User or friend not found");
        }

        // Remove Friend from User's friends list
        await this.prisma.user.update({
            where: { id: userId },
            data: {
                friends: {
                    disconnect: { id: friendId },
                },
            },
        });

        // Remove User from Friend's friends list
        await this.prisma.user.update({
            where: { id: friendId },
            data: {
                friends: {
                    disconnect: { id: userId },
                },
            },
        });

        const updatedFriend = await this.prisma.user.findUnique({
            where: { id: friendId },
            include: { friends: true },
        });

        return updatedFriend;
    }

    async getFriends(email: string): Promise<User[]> {
        const user = await this.prisma.user.findUnique({
            where: { email: email },
            include: { friends: true },
        });

        if (!user) {
            throw new Error("User not found");
        }

        return user.friends;
    }
}
