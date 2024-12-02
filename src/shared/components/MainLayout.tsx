'use client';
import { useState } from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";

interface LayoutProps {
    children: React.ReactNode;
    className?: string;
}

export default function MainLayout({ children, className }: LayoutProps) {
    const [isMenuOpen, setIsMenuOpen] = useState(true);
    const handleMenuToggle = () => {
        setIsMenuOpen(!isMenuOpen);
    }
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
