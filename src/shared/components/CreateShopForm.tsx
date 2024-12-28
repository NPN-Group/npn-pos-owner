"use client";
import { useState } from "react";
import { CreateShopFormButton, DragAndDropImageUpload, InputField } from "@/shared/components";
import { TCreateShop, TError, TFocused } from "@/shared/types";
import { CreateShopAction } from "@/shared/actions";

export type CreateShopFormProps = {
    onClose: () => void;
};

export default function CreateShopForm({ onClose }: CreateShopFormProps) {
    const [errors, setErrors] = useState<TError>({ name: "", phone: "", location: "", shopImageFile: "" });
    const [focused, setFocused] = useState<TFocused>({ name: false, phone: false, location: false });
    const [data, setData] = useState<TCreateShop>({
        name: "",
        phone: "",
        location: "",
        shopImageFile: undefined,
    });

    const handleFocusChange = (field: string, isFocused: boolean) => {
        setFocused((prev) => ({ ...prev, [field]: isFocused }));
    };

    const handleFormSubmission = async (e: React.FormEvent) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("name", data.name);
        formData.append("phone", data.phone);
        formData.append("location", data.location || "");
        formData.append("shopImageFile", data.shopImageFile!);

        try {
            const response = await CreateShopAction(formData);
            if (response.errors) {
                setErrors(response.errors);
                setData({
                    name: response.data?.name!,
                    phone: response.data?.phone!,
                    location: response.data?.location!,
                    shopImageFile: response.data?.shopImageFile!,
                })
            } else {
                console.log("Shop created successfully.");
                onClose();
            }
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-10">
            <div className="bg-[#F9FAFB] rounded-lg shadow-lg h-[90%] max-w-[36rem] w-[90%] flex flex-col justify-center gap-2">
                <h3 className="text-2xl font-semibold text-center text-gray-800">New Shop</h3>
                <form onSubmit={handleFormSubmission} className="flex flex-col h-full overflow-y-auto" encType="multipart/form-data">
                    <div className="flex flex-col gap-8 py-4 h-[90%] overflow-y-auto">
                        <DragAndDropImageUpload
                            id="shop-image-file"
                            name="shopImageFile"
                            error={errors.shopImageFile}
                            onChange={(file) => setData({ ...data, shopImageFile: file })}
                            value={data.shopImageFile}
                        />
                        <InputField
                            id="name"
                            name="name"
                            type="text"
                            label="Name"
                            value={data.name}
                            error={errors.name}
                            focused={focused.name}
                            onChange={(value) => { setData({ ...data, name: value }) }}
                            onFocus={() => handleFocusChange("name", true)}
                            onBlur={() => handleFocusChange("name", false)}
                            className="max-w-[20rem] w-[95%] mx-auto border-[1px] rounded"
                        />

                        <InputField
                            id="phone"
                            name="phone"
                            type="phone"
                            label="Phone"
                            value={data.phone}
                            error={errors.phone}
                            focused={focused.phone}
                            onChange={(value) => { setData({ ...data, phone: value }) }}
                            onFocus={() => handleFocusChange("phone", true)}
                            onBlur={() => handleFocusChange("phone", false)}
                            className="max-w-[20rem] w-[95%] mx-auto border-[1px] rounded"
                        />

                        <InputField
                            id="location"
                            name="location"
                            type="text"
                            value={data.location}
                            label="Location (Optional)"
                            error={errors.location}
                            focused={focused.location}
                            onChange={(value) => { setData({ ...data, location: value }) }}
                            onFocus={() => handleFocusChange("location", true)}
                            onBlur={() => handleFocusChange("location", false)}
                            className="max-w-[20rem] w-[95%] mx-auto border-[1px] rounded"
                        />
                    </div>
                    <CreateShopFormButton onClose={onClose} />
                </form>
            </div>
        </div>
    );
}
