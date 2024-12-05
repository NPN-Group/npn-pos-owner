"use client";
import { ReactNode, useEffect, useState } from "react";
import { UserResponse } from "@/shared/types";
import { useFetchUser } from "@/shared/hooks/user";
import { AuthContext } from "@/shared/contexts";

export default function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<UserResponse | null>(null);

    const response = useFetchUser();

    useEffect(() => {
        if (response.data) {
            setUser(response.data.data);
        } else {
            setUser(null);
        }
    }, [response]);


    return (
        <AuthContext.Provider value={{ user, setUser }}>
            {children}
        </AuthContext.Provider>
    );
};
