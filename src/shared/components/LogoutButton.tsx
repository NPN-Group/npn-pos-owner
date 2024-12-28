"use client";

import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { useRouter } from 'next/navigation';
import { logout } from '../services';

export default function LogoutButton() {
    const { replace } = useRouter();
    const handleLogout = async () => {
        try {
            const { message } = await logout();
            console.log(message);
            replace("/login");
        } catch (err) {
            console.error(err)
        }
    };

    return (
        <ExitToAppIcon onClick={handleLogout} className="hover:cursor-pointer text-primary hover:scale-125 transition duration-300" />
    )
}
