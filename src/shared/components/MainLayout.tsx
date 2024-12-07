'use client';

import { useEffect, useState } from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";

interface LayoutProps {
    children: React.ReactNode;
    className?: string;
}

export default function MainLayout({ children, className }: LayoutProps) {
    const [isMenuOpen, setIsMenuOpen] = useState(true);
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
                <main className={`${className}`}>
                    {children}
                </main>
            </div>
        </div>
    );
};
