import { login } from "@/shared/services";
import { ActionResponse, LoginSchema, TLogin, User } from "@/shared/types";

export async function loginAction(formData: FormData): Promise<ActionResponse<TLogin, User>> {
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    try {
        const data = {
            email: email,
            password: password,
        }

        const validateData = LoginSchema.safeParse(data);
        if (!validateData.success) {
            return {
                data: { email: email, password: password },
                errors: {
                    email: validateData.error.errors.find((error) => error.path[0] === "email")?.message || "",
                    password: validateData.error.errors.find((error) => error.path[0] === "password")?.message || "",
                }
            }
        }

        const response = await login(validateData.data);
        return {
            data: validateData.data,
            response: response,
        }
    } catch (err) {
        console.log(err);
        if (err instanceof Error) {
            return {
                data: { email: email, password: password },
                errors: { internal: err.message }
            }
        }

        return {
            data: { email: email, password: password },
            errors: { internal: "An error occurred. Please try again later." }
        }
    }
}
