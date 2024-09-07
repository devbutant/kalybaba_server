import { Injectable } from "@nestjs/common";
import { Room } from "@prisma/client";
import { PrismaService } from "../prisma.service";

@Injectable()
export class RoomsService {
    constructor(private readonly prisma: PrismaService) {}

    async createRoom(name: string, userIds: string[]): Promise<Room> {
        const users = await this.prisma.user.findMany({
            where: { id: { in: userIds } },
        });

        if (users.length !== userIds.length) {
            throw new Error("One or more users not found");
        }

        return this.prisma.room.create({
            data: {
                name: name,
                users: {
                    connect: userIds.map((id) => ({ id })),
                },
            },
        });
    }

    async getRooms(userId: string): Promise<Room[]> {
        return this.prisma.room.findMany({
            where: {
                users: {
                    some: { id: userId },
                },
            },
        });
    }

    async getRoomById(id: string): Promise<Room | null> {
        return this.prisma.room.findUnique({
            where: { id },
            include: { users: true },
        });
    }

    async addUsersToRoom(id: string, userIds: string[]): Promise<Room> {
        const users = await this.prisma.user.findMany({
            where: { id: { in: userIds } },
        });

        if (users.length !== userIds.length) {
            throw new Error("One or more users not found");
        }

        return this.prisma.room.update({
            where: { id },
            data: {
                users: {
                    connect: userIds.map((id) => ({ id })),
                },
            },
        });
    }
}
