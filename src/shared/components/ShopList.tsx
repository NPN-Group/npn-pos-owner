"use client";
import { useRouter } from "next/navigation";
import { Shop } from "@/shared/types";
import { ShopItem } from "@/shared/components";

type ShopListProps = {
    shops: Shop[];
    className?: string;
};

export default function ShopList({ shops, className }: ShopListProps) {
    const { push } = useRouter();
    return (
        <section className={`${className}`}>
            {shops && shops.map((shop) => (
                <ShopItem key={shop.id} shop={shop} onClick={() => push(`/${shop.id}`)} />
            ))}
        </section>
    );
}
