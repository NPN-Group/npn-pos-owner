import { editUserProfile } from "@/shared/services";
import { ActionResponse, UpdateUserSchema, UpdateUserDto, User, EditUserProfile } from "@/shared/types";

export async function editUserProfileAction(id: string, params: EditUserProfile): Promise<ActionResponse<UpdateUserDto, User>> {

      const firstName = params.firstName;
      const lastName = params.lastName;
      const img = (params.img as File | null) ?? undefined;
      const userId = id;

      console.log("editUserProfileAction",firstName, lastName, userId)

      if (!userId) {
            return {
                data: { firstName, lastName, img },
                errors: { internal: "User ID is missing." }
            };
        }

      try {
            const data = {
                  firstName: firstName,
                  lastName: lastName,
                  img: img
            }

            const validateData = UpdateUserSchema.safeParse(data);
            if (!validateData.success) {
                  return {
                  errors: {
                        firstName: validateData.error.errors.find((error) => error.path[0] === "firstName")?.message || "",
                        lastName: validateData.error.errors.find((error) => error.path[0] === "lastName")?.message || "",
                        img: validateData.error.errors.find((error) => error.path[0] === "img")?.message || "",
                  }
                  }
            }

            const formData = new FormData();
            const jsonPayload = JSON.stringify({
                  firstName: data.firstName,
                  lastName: data.lastName,
            });
            formData.append('json', jsonPayload);
            if (data.img instanceof File) {
            formData.append('avatar', data.img); 
            }
            const response = await editUserProfile(userId, formData);
            return {response: response};

      } catch (err) {
            console.log(err);
            if (err instanceof Error) {
                  return {
                  data: { firstName: firstName, lastName: lastName, img: img },
                  errors: { internal: err.message }
                  }
            }
            return {
                  data: { firstName: firstName, lastName: lastName, img: img},
                  errors: { internal: "An error occurred. Please try again later." }
            }
    }
}