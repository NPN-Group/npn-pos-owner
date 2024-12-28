"use client";

import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { useRouter } from 'next/navigation';
import { logout } from '../services';
import toast from 'react-hot-toast';

export default function LogoutButton() {
    const { replace } = useRouter();
    const handleLogout = async () => {
        try {
            const { message, statusCode } = await logout();
            console.log(message);
            if (statusCode === 200) {
                toast.success(message);
            } else {
                toast.error(message);
            }
            replace("/login");
        } catch (err) {
            console.error(err)
            if (err instanceof Error) {
                toast.error(err.message);
            } else {
                toast.error("An error occurred");
            }
        }
    };

    return (
        <ExitToAppIcon onClick={handleLogout} className="hover:cursor-pointer text-primary hover:scale-125 transition duration-300" />
    )
}
