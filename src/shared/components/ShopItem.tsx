import Image from "next/image";
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import VerifiedUserOutlinedIcon from '@mui/icons-material/VerifiedUserOutlined';
import StoreIcon from '@mui/icons-material/Store';
import { Shop } from "@/shared/types";

type ShopItemProps = {
    shop: Shop;
    onClick: () => void;
};

export default function ShopItem({ shop, onClick }: ShopItemProps) {
    return (
        <div
            className={`flex items-center p-4 gap-4 shadow-md rounded-md border-2 cursor-pointer transition-all duration-300 hover:bg-primary`}
            onClick={onClick}
        >
            <Image
                src={shop.img ? `${process.env.NEXT_PUBLIC_ENV}/attachments/${shop.img}` : "/assets/shop-thumbnail.png"}
                alt={shop.name}
                width={120}
                height={120}
                className="object-cover w-20 h-20"
            />
            <div className="flex flex-col flex-grow gap-0">
                <div className="flex items-center gap-1 text-gray-800">
                    <StoreIcon style={{ scale: 0.75 }} />
                    <h3 className="text-xl font-semibold">{shop.name}</h3>
                </div>
                <div className="flex items-center gap-1 text-gray-600">
                    <LocalPhoneIcon style={{ scale: 0.75 }} />
                    <p className="text-sm">{shop.phone}</p>
                </div>
                <div className="flex items-center gap-1 text-gray-600">
                    <LocationOnIcon style={{ scale: 0.75 }} />
                    <p className="text-sm">{shop.location || "No Location"}</p>
                </div>
            </div>
            <VerifiedUserOutlinedIcon />
        </div>
    );
}
