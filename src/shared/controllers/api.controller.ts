import axiosInstance from "@/shared/lib/axios";
import { AxiosError } from "axios";

export type APIResponse<T> = {
    statusCode: number;
    message: string;
    error: any;
    data: T;
};

export async function apiController<PARAM, RESP>(
    url: string,
    method: "get" | "post" | "put" | "patch" | "delete",
    data?:
        | PARAM,
): Promise<APIResponse<RESP>> {
    try {
        const response = await axiosInstance.request<APIResponse<RESP>>({ url, method, data });
        return response.data;
    } catch (error: unknown) {
        let message = "An error occurred";
        if (error instanceof AxiosError && error.response?.data?.message) {
            message = Array.isArray(error.response.data.message)
                ? error.response.data.message[0]
                : error.response.data.message;
        }
        return Promise.reject(message);
    }
}
