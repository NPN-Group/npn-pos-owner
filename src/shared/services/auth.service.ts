import { APIResponse, TLogin, TRegister, User } from "@/shared/types";
import { fetcherCSR } from "@/shared/lib";
import { API_URL } from "@/shared/common/constants";

export async function login(param: TLogin): Promise<APIResponse<User>> {
    return fetcherCSR<User>(`${API_URL}/api/auth/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(param),
    });
}

export async function register(param: TRegister): Promise<APIResponse<User>> {
    return fetcherCSR<User>(`${API_URL}/api/auth/register`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(param),
    });
}

export async function logout(): Promise<APIResponse<undefined>> {
    return fetcherCSR<undefined>(`${API_URL}/api/auth/logout`, {
        method: "POST",
    });
}
