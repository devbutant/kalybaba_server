import { Ad } from "@prisma/client";
import { CreateAdDto } from "./dto/create-ad.dto";
import { UpdateAdDto } from "./dto/update-ad.dto";

export interface AdServiceInterface {
    createAd(createAdto: CreateAdDto): Promise<Ad>;
    ads(id: string): Promise<Ad[]>;
    getMyAds(id: string): Promise<Ad[]>;
    ad(id: string): Promise<Ad>;
    updateAd(id: string, udpdateAdDto: UpdateAdDto): Promise<Ad>;
    removeAd(id: string, label: string): Promise<Ad>;
}
