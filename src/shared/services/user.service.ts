import { apiController, APIResponse } from "@/shared/controllers/api.controller";
import { UserResponse } from "@/shared/types";

export const UserService = {
    fetchUser: async (): Promise<APIResponse<UserResponse>> => {
        return apiController<null, UserResponse>("/users/me", "get");
    },
}