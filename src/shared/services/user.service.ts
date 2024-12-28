import { APIResponse, User } from "@/shared/types";
import { fetcher } from "../lib";

export const UserService = {
    fetchUser: async (): Promise<APIResponse<User>> => {
        return fetcher<User>("users/me");
    }
}
