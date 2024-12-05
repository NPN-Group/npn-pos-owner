"use client";
import { UserResponse } from "@/shared/types";
import { useQuery } from "@tanstack/react-query";
import { APIResponse } from "@/shared/controllers";
import { UserService } from "@/shared/services";

export const useFetchUser = () => {
  return useQuery<APIResponse<UserResponse>, Error>({
    queryKey: ["user"],
    queryFn: () => {
      try {
        return UserService.fetchUser();
      } catch (error) {
        console.error(error);
        throw new Error("Failed to fetch user");
      }
    },
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 5,
  });
};
