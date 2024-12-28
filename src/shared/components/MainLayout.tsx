"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";

interface LayoutProps {
    children: React.ReactNode;
}

export default function MainLayout({ children }: LayoutProps) {
    const [isMenuOpen, setIsMenuOpen] = useState(true);
    const pathname = usePathname();
    const pathparts = pathname.split("/");
    let path = '';
    if (pathparts.length == 2) {
        path = pathparts[0];
    } else if (pathparts.length == 3) {
        path = pathparts[pathparts.length - 1];
    }
    const handleMenuToggle = () => {
        setIsMenuOpen(prevState => {
            const newState = !prevState;
            window.localStorage.setItem("isMenuOpen", JSON.stringify(newState));
            return newState;
        });
    };

    useEffect(() => {
        const isMenuOpen = window.localStorage.getItem("isMenuOpen");
        if (isMenuOpen !== null) {
            setIsMenuOpen(JSON.parse(isMenuOpen));
        }
    }, []);

    return (
        <div className="flex flex-col h-screen">
            <Header onMenuToggle={handleMenuToggle} />
            <div className="flex flex-1 overflow-hidden">
                <Sidebar isMenuOpen={isMenuOpen} />
                <main className="flex-1 p-4 overflow-y-auto space-y-6">
                    {children}
                </main>
            </div>
        </div>
    );
}
