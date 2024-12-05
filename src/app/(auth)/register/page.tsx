"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { ZodError } from "zod";
import { RegisterSchema, TRegister, TError } from "@/shared/types";
import { InputField } from "@/shared/components";
import { useRegister } from "@/shared/hooks/auth";

export default function Register() {
    const [mailFocused, setMailFocused] = useState(false);
    const [passwordFocused, setPasswordFocused] = useState(false);
    const [confirmPasswordFocused, setConfirmPasswordFocused] = useState(false);

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

    const { mutate: register } = useRegister();

    const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        setErrors({ email: "", password: "", confirmPassword: "" });
        try {
            const data = RegisterSchema.parse(formData);

            register(data);

            setFormData({ email: "", password: "", confirmPassword: "", });
            setErrors({ email: "", password: "", confirmPassword: "", });

            console.log("Form submitted successfully");
        } catch (err) {
            if (err instanceof ZodError) {
                const newErrors: TError = { email: "", password: "", confirmPassword: "", };

                err.errors.forEach((error) => {
                    if (error.path[0] === "email") {
                        newErrors.email = error.message;
                    }
                    if (error.path[0] === "password") {
                        newErrors.password = error.message;
                    }
                    if (error.path[0] === "confirmPassword") {
                        newErrors.confirmPassword = error.message;
                    }
                });

                setErrors(newErrors);
            }
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
                            onFocus={() => setMailFocused(true)}
                            onBlur={() => setMailFocused(false)}
                            className="max-w-[20rem] w-[95%] mx-auto border-[1px] rounded"
                            label="Email Address"
                            error={errors.email}
                            focused={mailFocused}
                        />

                        <InputField
                            type="password"
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={(value) => handleInputChange("password", value)}
                            onFocus={() => setPasswordFocused(true)}
                            onBlur={() => setPasswordFocused(false)}
                            className="max-w-[20rem] w-[95%] mx-auto border-[1px] rounded"
                            label="Password"
                            error={errors.password}
                            focused={passwordFocused}
                        />

                        <InputField
                            type="password"
                            id="confirmPassword"
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={(value) => handleInputChange("confirmPassword", value)}
                            onFocus={() => setConfirmPasswordFocused(true)}
                            onBlur={() => setConfirmPasswordFocused(false)}
                            className="max-w-[20rem] w-[95%] mx-auto border-[1px] rounded"
                            label="Confirm Password"
                            error={errors.confirmPassword}
                            focused={confirmPasswordFocused}
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
