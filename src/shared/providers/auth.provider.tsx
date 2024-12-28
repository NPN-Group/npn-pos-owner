"use client";
import { ReactNode, useState } from "react";
import { User } from "@/shared/types";
import { AuthContext } from "@/shared/contexts";

type AuthProviderProps = {
    initialUser?: User,
    children: ReactNode
}

export default function AuthProvider({ children, initialUser }: AuthProviderProps) {
    const [user, setUser] = useState<User | undefined>(initialUser);
    return (
        <AuthContext.Provider value={{ user, setUser }}>
            {children}
        </AuthContext.Provider>
    );
};
