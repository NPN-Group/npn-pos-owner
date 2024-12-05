"use client";
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { authService } from "@/shared/services";
import { useAuth } from "@/shared/hooks/auth";

const useLogout = () => {
    const router = useRouter();
    const { setUser } = useAuth();
    return useMutation({
        mutationFn: () => authService.logout(),
        onSuccess: (data) => {
            console.log('Logout successful:', data.message);
            setUser(null);
            router.replace('/login');
        },
        onError: (error) => {
            console.error('Logout failed:', error);
            setUser(null);
            router.replace('/login');
        },
    });
};

export default useLogout;
