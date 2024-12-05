import { apiController, APIResponse } from "@/shared/controllers";
import { AuthResponse, TLogin, TRegister } from "@/shared/types";

export const authService = {
    login: async (param: TLogin): Promise<APIResponse<AuthResponse>> => {
        return apiController<TLogin, AuthResponse>("/auth/login", "post", param);
    },

    register: async (param: TRegister): Promise<APIResponse<AuthResponse>> => {
        return apiController<TRegister, AuthResponse>("/auth/register", "post", param);
    },

    logout: async (): Promise<APIResponse<undefined>> => {
        return apiController<null, undefined>("/auth/logout", "post");
    },
}
