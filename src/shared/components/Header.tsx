"use client";

import Link from "next/link";
import Image from "next/image";
import { useParams } from "next/navigation";
import NotificationsIcon from '@mui/icons-material/Notifications';
import MenuIcon from '@mui/icons-material/Menu';
import { useAuth } from "@/shared/hooks";
import { ShopParams } from "@/shared/types";

type HeaderProps = {
    onMenuToggle: () => void;
};

export default function Header({ onMenuToggle }: HeaderProps) {
    const { user } = useAuth();
    const BASE_AVATAR = "/assets/avatar.jpg";
    const avatarImage = user?.img ? `${process.env.NEXT_PUBLIC_ENV}/attachments/${user.img}` : BASE_AVATAR;
    const { shopId } = useParams<ShopParams>();
    return (
        <header className="w-full bg-[#f7f7f7] flex flex-1 items-center justify-between px-3 py-4 max-h-12 h-full">
            <div className="flex items-center space-x-4">
                <div onClick={onMenuToggle} className="transition ease-in duration-100 hover:cursor-pointer hover:scale-125">
                    <MenuIcon className="text-2xl text-gray-600" />
                </div>
                <Link href={`/${shopId}`}><Image src="/assets/logo.svg" alt="logo" width={100} height={100} /></Link>
            </div>
            <div className="flex items-center space-x-2">
                <div onClick={() => console.log(`Notifications clicked`)} className="hover:cursor-pointer">
                    <NotificationsIcon className="text-2xl text-gray-600" />
                </div>
                <div onClick={() => console.log(`Avatar clicked`)} className="flex items-center justify-center w-7 h-7 bg-gray-300 rounded-full border-2 border-[#f0f0f0] hover:cursor-pointer">
                    <Link href={`/${shopId}/profile`}>
                        <Image
                            src={`${process.env.NEXT_PUBLIC_ENV}/uploads/${user?.img}`}
                            alt="avatar"
                            priority={true}
                            width={100}
                            height={100}
                            className="rounded-full w-6 h-6 hover:border-4 border-white box-content"
                        />
                    </Link>
                </div>
            </div>
        </header>
    );
}
