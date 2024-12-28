import React from 'react'

type CreateShopFormButtonProps = {
    onClose: () => void;
}
export default function CreateShopFormButton({ onClose }: CreateShopFormButtonProps) {
    return (
        <div className="flex justify-end gap-4 items-center px-8 py-4 font-semibold bg-[#e4e7eb]">
            <button
                type="button"
                onClick={onClose}
                className="py-1 px-4 bg-white text-primary border-[1px] border-primary rounded-md hover:bg-slate-50 active:bg-slate-100"
            >
                Cancel
            </button>
            <button
                type="submit"
                className="py-1 px-4 bg-primary text-white border-white border-[1px] rounded-md hover:bg-opacity-75 active:bg-opacity-100"
            >
                Create
            </button>
        </div>
    )
}
