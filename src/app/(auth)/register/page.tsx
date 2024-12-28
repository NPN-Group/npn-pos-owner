"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { TRegister, TError, TFocused } from "@/shared/types";
import { InputField } from "@/shared/components";
import { registerAction } from "@/shared/actions";
import { useRouter } from "next/navigation";

export default function Register() {
    const { replace } = useRouter();
    const [formData, setFormData] = useState<TRegister>({
        email: "",
        password: "",
        confirmPassword: "",
    });

    const [errors, setErrors] = useState<TError>({
        email: "",
        password: "",
        confirmPassword: "",
    });

    const [focused, setFocused] = useState<TFocused>({
        email: false,
        password: false,
        confirmPassword: false,
    });

    const handleFocusChange = (field: string, isFocused: boolean) => {
        setFocused((prev) => ({ ...prev, [field]: isFocused }));
    };

    const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        setErrors({ email: "", password: "", confirmPassword: "" });
        try {
            const formDataObj = new FormData();
            formDataObj.append("email", formData.email);
            formDataObj.append("password", formData.password);
            formDataObj.append("confirmPassword", formData.confirmPassword);
            const { errors, data, response } = await registerAction(formDataObj);
            if (errors) {
                setFormData({
                    ...formData,
                    email: data?.email!,
                    password: data?.password!,
                    confirmPassword: data?.confirmPassword!,
                });
                setErrors(errors);
                return;
            }

            if (response?.statusCode === 201) {
                console.log("Success");
                console.log(response?.message);
                console.log(response?.data);

                // add toast success message

                replace("/select-shop");
            } else {
                console.log("Error");
                console.log(response?.message);
                console.log(response?.error);

                // add toast error message
            }

        } catch (err) {
            console.log(err);

            // add toast error message
        }
    };

    const handleInputChange = (field: string, value: string) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
    }

    return (
        <section className="grid place-items-center min-h-screen">
            <div className="flex flex-col w-full justify-center mx-auto py-4 gap-8 sm:max-w-[25rem] sm:border-black sm:border-opacity-20 sm:border-[1px] sm:box-border sm:min-h-[80vh] sm:shadow-xl">
                <div className="flex flex-col items-center gap-4">
                    <Image src="/assets/logo.svg" alt="logo" width={100} height={100} />
                    <div className="flex flex-col gap-2">
                        <h1 className="text-xl font-bold text-center">Create Your Account</h1>
                        <p className="text-lg font-semibold text-center">Please register to continue</p>
                    </div>
                </div>
                <form className="flex flex-col gap-8" onSubmit={handleFormSubmit}>
                    <section className="flex flex-col gap-8">
                        <InputField
                            type="text"
                            id="mail"
                            name="mail"
                            value={formData.email}
                            onChange={(value) => handleInputChange("email", value)}
                            onFocus={() => handleFocusChange("email", true)}
                            onBlur={() => handleFocusChange("email", false)}
                            className="max-w-[20rem] w-[95%] mx-auto border-[1px] rounded"
                            label="Email Address"
                            error={errors.email}
                            focused={focused.email}
                        />

                        <InputField
                            type="password"
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={(value) => handleInputChange("password", value)}
                            onFocus={() => handleFocusChange("password", true)}
                            onBlur={() => handleFocusChange("password", false)}
                            className="max-w-[20rem] w-[95%] mx-auto border-[1px] rounded"
                            label="Password"
                            error={errors.password}
                            focused={focused.password}
                        />

                        <InputField
                            type="password"
                            id="confirmPassword"
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={(value) => handleInputChange("confirmPassword", value)}
                            onFocus={() => handleFocusChange("confirmPassword", true)}
                            onBlur={() => handleFocusChange("confirmPassword", false)}
                            className="max-w-[20rem] w-[95%] mx-auto border-[1px] rounded"
                            label="Confirm Password"
                            error={errors.confirmPassword}
                            focused={focused.confirmPassword}
                        />
                    </section>
                    <button type="submit" className="bg-[#F5533D] text-white font-bold text-xl rounded max-w-[20rem] w-[95%] mx-auto py-2 px-4">
                        Register
                    </button>
                </form>
                <p className="text-center">
                    Already have an account? <Link href="/login" className="text-[#F5533D]">Log in</Link>
                </p>
            </div>
        </section>
    );
}
