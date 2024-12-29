"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { TLogin, TError } from "@/shared/types"
import { InputField } from "@/shared/components";
import { useAuth } from "@/shared/hooks";
import { loginAction } from "@/shared/actions";

export default function Login() {
    const [formData, setFormData] = useState<TLogin>({ email: "", password: "" });
    const [errors, setErrors] = useState<TError>({ email: "", password: "" });
    const [focused, setFocused] = useState({ email: false, password: false });
    const handleInputChange = (field: string, value: string) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
    };

    const handleFocusChange = (field: string, isFocused: boolean) => {
        setFocused((prev) => ({ ...prev, [field]: isFocused }));
    };

    const { setUser } = useAuth()
    const { replace } = useRouter();

    const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        setErrors({ email: "", password: "" });

        try {
            const formDataObj = new FormData();
            formDataObj.append("email", formData.email);
            formDataObj.append("password", formData.password);
            const { data, errors, response } = await loginAction(formDataObj);
            if (errors) {
                setFormData({
                    ...formData,
                    email: data?.email!,
                    password: data?.password!
                });
                setErrors(errors);

                toast.error("Validation error");
                return;
            }

            if (response?.statusCode === 200) {
                toast.success("Login successful");
                setUser(response?.data);
                replace("/select-shop");

            } else {
                console.log(response?.message);
                console.log(response?.error);
                toast.error(response?.message || "An error occurred");
            }

        } catch (err) {
            console.error(err);
            if (err instanceof Error) {
                toast.error(err.message);
            } else {
                toast.error("An error occurred");
            }
        }
    };

    return (
        <section className="grid place-items-center min-h-screen">
            <div className="flex flex-col w-full justify-center items mx-auto py-4 gap-8 sm:max-w-[25rem] sm:border-black sm:border-opacity-20 sm:border-[1px] sm:box-border sm:min-h-[80vh] sm:shadow-xl">
                <div className="flex flex-col items-center gap-4 sm:mb-auto">
                    <Image src="/assets/logo.svg" alt="logo" width={100} height={100} priority/>
                    <div className="flex flex-col gap-2">
                        <h1 className="text-xl font-bold text-center">Welcome Back!</h1>
                        <p className="text-lg font-semibold text-center">Connect your account</p>
                    </div>
                </div>
                <form className="flex flex-col gap-8 sm:mb-auto" onSubmit={handleFormSubmit}>
                    <section className="flex flex-col gap-8">
                        <InputField
                            id="mail"
                            name="mail"
                            type="text"
                            value={formData.email}
                            label="Email Address"
                            error={errors.email}
                            focused={focused.email}
                            onChange={(value) => handleInputChange("email", value)}
                            onFocus={() => handleFocusChange("email", true)}
                            onBlur={() => handleFocusChange("email", false)}
                            className="max-w-[20rem] w-[95%] mx-auto border-[1px] rounded"
                        />
                        <InputField
                            id="password"
                            name="password"
                            type="password"
                            value={formData.password}
                            label="Password"
                            error={errors.password}
                            focused={focused.password}
                            onChange={(value) => handleInputChange("password", value)}
                            onFocus={() => handleFocusChange("password", true)}
                            onBlur={() => handleFocusChange("password", false)}
                            className="max-w-[20rem] w-[95%] mx-auto border-[1px] rounded"
                        />
                    </section>
                    <button
                        type="submit"
                        className="bg-[#F5533D] text-white font-bold text-xl rounded max-w-[20rem] w-[95%] mx-auto py-2 px-4 hover:bg-[#F5533D] hover:opacity-75 active:bg-opacity-90"
                    >
                        Log in
                    </button>
                </form>

                <p className="text-center">
                    Don't have an account? <Link href="/register" className="text-[#F5533D]">Sign up</Link>
                </p>
            </div>
        </section>
    );
}
