"use server";

import { cookies } from "next/headers";
import { APIResponse } from "@/shared/types";

// Fetcher function to handle API requests on the server side
export async function fetcher<T>(url: string, options?: RequestInit): Promise<APIResponse<T>> {
    try {
        const cookieStore = await cookies();
        const originalResponse = await fetch(url, {
            ...options,
            headers: {
                ...options?.headers,
                Cookie: cookieStore.toString(),
            },
            method: options?.method || 'GET',
        });

        if (originalResponse.status === 401) {
            const refreshResponse = await fetch(`${process.env.NEXT_PUBLIC_ENV}/api/auth/refresh-token`, {
                ...options,
                method: 'POST',
                headers: {
                    ...options?.headers,
                    Cookie: cookieStore.toString(),
                },
            });

            if (refreshResponse.ok) {
                const { data } = await refreshResponse.json() as APIResponse<{ accessToken: string, refreshToken: string }>;
                const newResponse = await fetch(url, {
                    ...options,
                    headers: {
                        ...options?.headers,
                        Cookie: `accessToken=${data?.accessToken}; refreshToken=${data?.refreshToken}`,
                    },
                });

                return await newResponse.json() as APIResponse<T>;
            }

        }
        const data = await originalResponse.json();
        return data as APIResponse<T>;
    } catch (err) {
        if (err instanceof Error) {
            console.error(err.message);
            return {
                statusCode: 400,
                message: 'An error occurred',
                error: [err.message],
            }
        }

        return {
            statusCode: 400,
            message: 'An error occurred',
            error: [err],
        }
    }

}
