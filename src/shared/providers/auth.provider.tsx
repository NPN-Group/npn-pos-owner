"use client";
import { ReactNode, useState } from "react";
import { UserResponse } from "@/shared/types";
import { AuthContext } from "@/shared/contexts";

export default function AuthProvider({ children, userProps }: { children: ReactNode, userProps: UserResponse | null }) {
    const [user, setUser] = useState<UserResponse | null>(userProps);
    return (
        <AuthContext.Provider value={{ user, setUser }}>
            {children}
        </AuthContext.Provider>
    );
};
