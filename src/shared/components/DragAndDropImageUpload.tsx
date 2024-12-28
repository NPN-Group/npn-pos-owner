"use client";
import { ChangeEvent, useState, DragEvent, useEffect } from "react";
import ClearIcon from '@mui/icons-material/Clear';
import { MAX_FILE_SIZE } from "@/shared/common/constants";

export type DragAndDropImageUploadProps = {
    id: string;
    name: string;
    error: string;
    value?: File;
    accept?: string;
    className?: string;
    onChange: (file?: File) => void;
    maxSize?: number;
};
export default function DragAndDropImageUpload({
    id,
    name,
    error,
    accept = "image/*",
    onChange,
    className,
    maxSize = MAX_FILE_SIZE,
}: DragAndDropImageUploadProps) {
    const [imagePreview, setImagePreview] = useState<string | undefined>(undefined);
    const [shopImageName, setShopImageName] = useState<string | undefined>(undefined);
    const [localError, setLocalError] = useState<string | undefined>(error);
    const [dragEnter, setDragEnter] = useState<boolean>(false);

    const handleFileValidationAndPreview = (file: File) => {
        setLocalError(undefined);

        if (!file.type.startsWith('image/')) {
            if (shopImageName) return;
            setLocalError('Please select a valid image file.');
            return;
        }

        if (file.size > maxSize) {
            if (shopImageName) return;
            setLocalError('File size must be less than 10MB.');
            return;
        }

        const fileReader = new FileReader();
        fileReader.onloadend = () => {
            setImagePreview(fileReader.result as string);
            setShopImageName(file.name);
            onChange(file);
        };
        fileReader.readAsDataURL(file);
    };

    const onFileInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];

        if (file) {
            handleFileValidationAndPreview(file);
        }
    };

    const handleDrop = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setLocalError(undefined);
        const file = e.dataTransfer.files[0];
        if (file) {
            handleFileValidationAndPreview(file);
            const fileInput = document.getElementById(id) as HTMLInputElement;
            if (fileInput) {
                fileInput.files = e.dataTransfer.files;
            }
        }
    };

    const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setDragEnter(true);
    }

    const handleDragEnter = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
    }

    const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setDragEnter(false);
    }

    const clearInput = () => {
        setImagePreview(undefined);
        setShopImageName(undefined);
        setLocalError(undefined);
        onChange(undefined);
        const fileInput = document.getElementById(id) as HTMLInputElement;
        if (fileInput) {
            fileInput.value = '';
        }
    };

    useEffect(() => {
        setLocalError(error);
    }, [error]);

    return (
        <div className={`p-4 w-[90%] mx-auto gap-4 flex flex-col ${className}`}>
            <div
                className={`relative h-52 max-w-[20rem] w-full mx-auto rounded-lg cursor-pointer border-2 flex items-center justify-center bg-gray-100 ${localError ? "border-red-500" : "border-gray-300"} ${dragEnter ? "border-blue-500" : ""}`}
                onClick={() => document.getElementById(id)?.click()}
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                onDragEnter={handleDragEnter}
                onDragLeave={handleDragLeave}
            >
                {imagePreview ? (
                    <img
                        src={imagePreview}
                        alt="Preview"
                        className="w-full h-full object-cover"
                    />
                ) : (
                    <p className="text-center text-gray-600">Drop Shop Image</p>
                )}

                <input
                    type="file"
                    accept={accept}
                    className="hidden"
                    id={id}
                    name={name}
                    onChange={onFileInputChange}
                />
            </div>

            {shopImageName && (
                <div className="flex items-center justify-center gap-1 border-2 w-fit mx-auto rounded-lg bg-gray-50">

                    <p className="text-center text-gray-600">{shopImageName}</p>
                    <ClearIcon
                        onClick={clearInput}
                        className="cursor-pointer text-red-500 hover:text-white hover:bg-red-500 rounded-full transform transition-transform duration-300 ease-in-out"
                    />

                </div>
            )}

            {localError && (
                <p className="text-red-500 text-center w-[70%] mx-auto p-2 bg-red-100 rounded-lg">
                    {localError}
                </p>
            )}
        </div>
    );

};
