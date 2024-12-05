"use client";
import { AuthResponse, TRegister } from "@/shared/types";
import { useMutation } from "@tanstack/react-query";
import { authService } from "@/shared/services";
import { useRouter } from "next/navigation";
import { useAuth } from "@/shared/hooks/auth";
import { APIResponse } from "@/shared/controllers";

export function useRegister() {
    const router = useRouter();
    const { setUser } = useAuth();

    const mutation = useMutation<APIResponse<AuthResponse>, Error, TRegister>({
        mutationFn: (data: TRegister) => authService.register(data),
        onSuccess: (data) => {
            console.log("User registered successfully", data);
            setUser(data.data.user);
            router.push("/");
        },
        onError: (err) => {
            console.error(err);
        },
    },
    );

    return mutation;
}
