import { register } from "@/shared/services";
import { ActionResponse, RegisterSchema, TLogin, TRegister, User } from "@/shared/types";

export async function registerAction(formData: FormData): Promise<ActionResponse<TRegister, User>> {
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const confirmPassword = formData.get("confirmPassword") as string;

    try {
        const data = {
            email: email,
            password: password,
            confirmPassword: confirmPassword
        }

        const validateData = RegisterSchema.safeParse(data);
        if (!validateData.success) {
            return {
                data: { email: email, password: password, confirmPassword: confirmPassword },
                errors: {
                    email: validateData.error.errors.find((error) => error.path[0] === "email")?.message || "",
                    password: validateData.error.errors.find((error) => error.path[0] === "password")?.message || "",
                    confirmPassword: validateData.error.errors.find((error) => error.path[0] === "confirmPassword")?.message || "",
                }
            }
        }

        const response = await register(validateData.data);
        return {
            data: validateData.data,
            response: response,
        }
    } catch (err) {
        console.log(err);
        if (err instanceof Error) {
            return {
                data: { email: email, password: password, confirmPassword: confirmPassword },
                errors: { internal: err.message }
            }
        }

        return {
            data: { email: email, password: password, confirmPassword: confirmPassword },
            errors: { internal: "An error occurred. Please try again later." }
        }
    }
}
