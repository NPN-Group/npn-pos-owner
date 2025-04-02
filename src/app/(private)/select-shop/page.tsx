import Image from 'next/image';
import Link from "next/link";
import { headers } from 'next/headers';
import { LogoutButton, ShopList, CreateShopButton } from "@/shared/components";
import { getShops } from '@/shared/services';

export default async function Page() {
    const { data: shops } = await getShops();
    const header = await headers();
    const userHeader = header.get("x-user");
    const user = userHeader ? JSON.parse(userHeader) : null;
    const avatarImage = user?.img ? `${process.env.NEXT_PUBLIC_ENV}/attachments/${user.img}` : "/assets/avatar.jpg";

    return (
        <div className="max-h-screen h-screen flex flex-col">
            <header className="w-full bg-[#f7f7f7] flex items-center justify-between px-3 py-4 h-12">
                <div className="flex items-center space-x-4">
                    <Link href="/"><Image src="/assets/logo.svg" alt="logo" width={100} height={100} /></Link>
                </div>
                <div className="flex items-center space-x-4">
                    <LogoutButton />
                    <div
                        className="flex items-center justify-center w-7 h-7 bg-gray-300 rounded-full border-2 border-[#f0f0f0] hover:cursor-pointer"
                    >
                        <Image
                            src={`${process.env.NEXT_PUBLIC_ENV}/uploads/${user?.img}`}
                            alt="avatar"
                            priority={true}
                            width={100}
                            height={100}
                            className="rounded-full w-6 h-6 hover:border-4 border-white box-content"
                        />
                    </div>
                </div>
            </header>

            <section className="flex flex-col flex-1 w-full mx-auto max-w-[80vh] gap-4 py-4 overflow-hidden">
                <div className="w-full bg-white shadow-sm border-[1px] py-4">
                    <h2 className="text-2xl font-bold text-center text-gray-800">Welcome, {user?.firstName} {user?.lastName}</h2>
                    <p className="text-center text-gray-600">{user?.email}</p>
                </div>

                <div className="flex flex-col gap-6 bg-white border-[1px] py-4 shadow-md flex-1 overflow-hidden">
                    <h2 className="text-2xl font-bold text-center text-gray-800">Select Shop</h2>
                    <div className="flex flex-col gap-2 flex-1 overflow-hidden">
                        <CreateShopButton />
                        <div className="flex-1 overflow-auto px-4 py-2">
                            <ShopList shops={shops || []} className="flex flex-col gap-4" />
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
