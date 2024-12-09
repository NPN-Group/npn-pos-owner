"use client";

import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import HomeIcon from '@mui/icons-material/Home';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import BorderAllRoundedIcon from '@mui/icons-material/BorderAllRounded';
import LocalDiningRoundedIcon from '@mui/icons-material/LocalDiningRounded';
import DescriptionRoundedIcon from '@mui/icons-material/DescriptionRounded';
import TableRestaurantOutlinedIcon from '@mui/icons-material/TableRestaurantOutlined';
import StorefrontIcon from '@mui/icons-material/Storefront';
import { useLogout } from "@/shared/hooks/auth";
import { ShopParams } from "@/shared/types";

type SidebarProps = {
    isMenuOpen: boolean;
};

export default function Sidebar({ isMenuOpen }: SidebarProps) {
    const pathname = usePathname();
    const { shopId } = useParams<ShopParams>();
    const getLinkClass = (path: string) => {
        const baseClass = `flex items-center gap-1 py-3 ${isMenuOpen ? "px-3" : "justify-center"} font-medium hover:ease-in-out hover:transition-all hover:cursor-pointer`;
        const activeClass = "bg-[#F5533D] text-white";
        const inactiveClass = `text-black hover:text-[#F5533D] ${isMenuOpen ? "" : "hover:scale-150"}`;
        return pathname === path
            ? `${baseClass} ${activeClass}`
            : `${baseClass} ${inactiveClass}`;
    };

    const { mutate: logout } = useLogout();

    return (
        <aside className={`bg-white transition-[width] ease-in-out duration-300 ${isMenuOpen ? "w-48" : "w-12"} max-w-[250px]`} style={{ height: "calc(100vh - 3rem)", scrollbarWidth: "thin", scrollbarColor: "#F5533D transparent" }}>
            <ul className="bg-[#e0e0e0] flex flex-col overflow-y-auto overflow-x-hidden" style={{ height: "calc(100vh - 6rem)" }}>
                <Link href={`/${shopId}`} className={getLinkClass(`/${shopId}`)}>
                    <HomeIcon />
                    {isMenuOpen && <li className="flex-1">Home</li>}
                </Link>
                <Link href={`/${shopId}/menu`} className={getLinkClass(`/${shopId}/menu`)}>
                    <LocalDiningRoundedIcon />
                    {isMenuOpen && <li className="flex-1">Menu</li>}
                </Link>
                <Link href={`/${shopId}/order`} className={getLinkClass(`/${shopId}/order`)}>
                    <BorderAllRoundedIcon />
                    {isMenuOpen && <li className="flex-1">Order</li>}
                </Link>
                <Link href={`/${shopId}/table-layout`} className={getLinkClass(`/${shopId}/table-layout`)}>
                    <TableRestaurantOutlinedIcon />
                    {isMenuOpen && <li className="flex-1">Table Layout</li>}
                </Link>
                <Link href={`/${shopId}/report`} className={getLinkClass(`/${shopId}/report`)}>
                    <DescriptionRoundedIcon />
                    {isMenuOpen && <li className="flex-1">Report</li>}
                </Link>
                <Link href="/select-shop" className={getLinkClass(`/select-shop`)}>
                    <StorefrontIcon />
                    {isMenuOpen && <li className="flex-1">Shop</li>}
                </Link>
            </ul>
            <ul onClick={() => logout()} className="flex items-center justify-center place-items-center bg-[#e0e0e0] py-3 px-6 gap-1 text-black border-t-2 hover:bg-red-500 hover:text-white font-medium hover:ease-in-out hover:transition-all hover:cursor-pointer mt-auto">
                <ExitToAppIcon />
                {isMenuOpen && <li className="text-left bg-inherit border-none hover:border-none p-0">
                    Logout
                </li>}
            </ul>
        </aside>
    );
}
