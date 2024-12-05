"use client";
import { AuthResponse, TLogin } from "@/shared/types";
import { useMutation } from "@tanstack/react-query";
import { authService } from "@/shared/services";
import { useRouter } from "next/navigation";
import { useAuth } from "@/shared/hooks/auth";
import { APIResponse } from "@/shared/controllers";

export function useLogin() {
    const router = useRouter();
    const { setUser } = useAuth();
    const mutation = useMutation<APIResponse<AuthResponse>, Error, TLogin>({
        mutationFn: async (data: TLogin) => {
            return authService.login(data);
        },
        onSuccess: ({ data }) => {
            setUser(data.user);
            router.push("/");
        },
        onError: (err) => {
            console.error(err);
        },
    },
    );

    return mutation;
}
