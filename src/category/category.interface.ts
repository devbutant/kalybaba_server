import { Category } from "@prisma/client";
export interface CategoryServiceInterface {
    categories(): Promise<Category[]>;
}
