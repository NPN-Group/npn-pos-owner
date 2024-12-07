"use client";

import { MainLayout } from "@/shared/components";
import { useAuth } from "@/shared/hooks/auth";

export default function Home() {
    const { user } = useAuth();
    return (
        <MainLayout className="flex-1 p-4 overflow-y-auto">
            <h1>Hello, {user?.email}</h1>
            <p>Welcome to your dashboard</p>
            <p>{user?.firstName} {user?.lastName}</p>
        </MainLayout>
    );
}
