"use server";
import { cookies } from 'next/headers';

type FetcherSSRResponse = [response: Response, accessToken?: string, refreshToken?: string];
// Fetcher function to handle API requests on the server side only during server-side rendering (middleware)
export const fetcherSSR = async (url: string, options: RequestInit): Promise<FetcherSSRResponse> => {
    const cookieStore = await cookies();
    try {
        const response = await fetch(url, {
            ...options,
            headers: {
                ...options.headers,
                Cookie: cookieStore.toString(),
            }
        });
        if (response.ok) {
            return [response, undefined, undefined];
        }

        if (response.status === 401) {
            const refreshTokenResponse = await fetch(`${process.env.NEXT_PUBLIC_ENV}/api/auth/refresh-token`, {
                ...options,
                method: 'POST',
                headers: {
                    ...options.headers,
                    Cookie: cookieStore.toString(),
                },
            });

            if (refreshTokenResponse.ok) {
                const { data: { accessToken: newAccessToken, refreshToken: newRefreshToken } } = await refreshTokenResponse.json() as { data: { accessToken: string, refreshToken: string } };
                const response = await fetch(url, {
                    ...options,
                    headers: {
                        ...options.headers,
                        Cookie: `accessToken=${newAccessToken}; refreshToken=${newRefreshToken}`,
                    }
                });

                return [response, newAccessToken, newRefreshToken];
            } else {
                throw new Error('Refresh token failed');
            }
        } else {
            throw new Error(`Request failed with status ${response.status}`);
        }
    } catch (err) {
        throw err;
    }
};
