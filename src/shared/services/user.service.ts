import { APIResponse, User } from "@/shared/types";
import { fetcher } from "../lib";
import { API_URL } from "../common/constants";
import { fetcherCSR } from "@/shared/lib";

export const UserService = {
    fetchUser: async (): Promise<APIResponse<User>> => {
        return fetcher<User>(`${API_URL}/api/users/me`);
    }
}

export async function editUserProfile(id: string, formData: FormData): Promise<APIResponse<User>> {
    return fetcherCSR<User>(
        `${process.env.NEXT_PUBLIC_ENV}/api/users`,
        {
            method: "PATCH",
            body: formData,
        }
    );
}
