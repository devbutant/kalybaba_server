import { Type } from "@prisma/client";
export interface TypeServiceInterface {
    types(): Promise<Type[]>;
}
