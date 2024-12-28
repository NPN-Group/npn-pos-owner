import { APIResponse, User } from "@/shared/types";
import { fetcher } from "../lib";
import { API_URL } from "../common/constants";

export const UserService = {
    fetchUser: async (): Promise<APIResponse<User>> => {
        return fetcher<User>(`${API_URL}/api/users/me`);
    }
}
