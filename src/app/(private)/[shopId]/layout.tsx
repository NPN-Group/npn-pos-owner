import { headers } from "next/headers";
import { notFound } from "next/navigation";
import { MainLayout } from "@/shared/components";
import { getShop } from "@/shared/services";

export default async function ShopLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const header = await headers();
    const shopId = header.get("x-shop-id");
    console.log("Shop ID: ", shopId);

    if (!shopId) {
        notFound();
    }

    const { statusCode } = await getShop(shopId);
    if (statusCode !== 200) {
        notFound();
    }

    return (
        <MainLayout>
            {children}
        </MainLayout>
    );
}
