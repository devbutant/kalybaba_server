import { Injectable } from "@nestjs/common";
import { Prisma, User } from "@prisma/client";
import { passwordHash } from "src/utilities/password.utility";
import { PrismaService } from "../prisma.service";
import { UpdateUserDto } from "./dto/update-user.dto";
import { UserServiceInterface } from "./user.interface";

@Injectable()
export class UserService implements UserServiceInterface {
    constructor(private prisma: PrismaService) {}

    private excludePassword(user: User): Omit<User, "password"> {
        const { password, ...userWithoutPassword } = user;
        return userWithoutPassword;
    }

    async users(): Promise<Omit<User, "password">[]> {
        const users = await this.prisma.user.findMany({
            include: {
                ads: false,
            },
        });
        return users.map((user) => this.excludePassword(user));
    }

    async user(
        userWhereUniqueInput: Prisma.UserWhereUniqueInput
    ): Promise<User> {
        return this.prisma.user.findUnique({
            where: userWhereUniqueInput,
            include: {
                ads: false,
            },
        });
    }

    async updateUser(id: string, updateUserData: UpdateUserDto): Promise<User> {
        const initialPassword = updateUserData.password;
        const hashedPassword = await passwordHash(initialPassword);
        updateUserData.password = hashedPassword;

        return this.prisma.user.update({
            where: { id: id },
            include: {
                ads: false,
            },
            data: updateUserData as Prisma.UserUpdateInput,
        });
    }

    async updateUserConnectionStatus(
        email: string,
        connected: boolean
    ): Promise<User> {
        return this.prisma.user.update({
            where: { email: email },
            data: { connected },
        });
    }

    async deleteUser(where: Prisma.UserWhereUniqueInput): Promise<void> {
        await this.prisma.user.delete({
            where,
            include: {
                ads: false,
            },
        });
    }
}
