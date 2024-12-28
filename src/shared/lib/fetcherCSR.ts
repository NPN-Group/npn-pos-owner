"use client"

import { APIResponse } from "@/shared/types";

// Fetcher function to handle API requests on the client side
export async function fetcherCSR<T>(url: string, options?: RequestInit): Promise<APIResponse<T>> {
    try {
        const response = await fetch(url, {
            ...options,
            credentials: 'include',
        });

        if (response.status === 401) {
            const refreshResponse = await fetch(`${process.env.NEXT_PUBLIC_ENV}/api/auth/refresh-token`, {
                ...options,
                method: 'POST',
                credentials: 'include',
            });

            if (refreshResponse.ok) {
                await refreshResponse.json() as APIResponse<{ accessToken: string, refreshToken: string }>;

                const newResponse = await fetch(url, {
                    ...options,
                    credentials: 'include',
                });

                return await newResponse.json() as APIResponse<T>;
            }
        }

        return await response.json() as APIResponse<T>;
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