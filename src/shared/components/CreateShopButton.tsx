"use client";

import { useState } from "react";
import AddCircleOutlinedIcon from '@mui/icons-material/AddCircleOutlined';
import { CreateShopForm } from "@/shared/components";

export default function CreateShopButton() {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleOpenModal = () => setIsModalOpen(true);
    const handleCloseModal = () => setIsModalOpen(false);

    return (
        <>
            <div>
                <button
                    type="button"
                    onClick={handleOpenModal}
                    className="flex mx-auto w-[95%] px-4 py-2 gap-2 justify-center items-center hover:bg-opacity-75 text-white font-semibold text-lg bg-primary rounded-md"
                >
                    <AddCircleOutlinedIcon />
                    <span>Create New Shop</span>
                </button>

            </div>
            {isModalOpen && <CreateShopForm onClose={handleCloseModal} />}
        </>
    );
}
