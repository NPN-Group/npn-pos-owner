"use client";
import { ReactNode, useEffect, useState } from "react";
import { UserResponse } from "@/shared/types";
import { AuthContext } from "@/shared/contexts";
import axiosInstance from "../lib/axios";
import { APIResponse } from "../controllers";
import { useRouter } from "next/navigation";

export default function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<UserResponse | null>(null);

    const { replace } = useRouter();
    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await axiosInstance.get<APIResponse<UserResponse>>("/users/me");
                if (response.data) {
                    setUser(response.data.data);
                } else {
                    setUser(null);
                }

            } catch (error) {
                console.error(error);
                setUser(null);
                replace("/login");
            }
        }
        fetchUser();
    }, []);


    return (
        <AuthContext.Provider value={{ user, setUser }}>
            {children}
        </AuthContext.Provider>
    );
};
