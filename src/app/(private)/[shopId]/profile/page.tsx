"use client"

import { useAuth } from "@/shared/hooks"
import { useState, useEffect } from "react";
import { 
    CreateOutlined as CreateOutlinedIcon, 
    Person as PersonIcon, 
    Photo as PhotoIcon 
} from "@mui/icons-material";
import { 
    Button, 
    Dialog, 
    DialogTitle, 
    DialogContent, 
    DialogActions, 
    TextField, 
    Avatar 
} from "@mui/material";
import Image from "next/image";
import { editUserProfileAction } from "@/shared/actions";
import toast from "react-hot-toast";


export default function UserPage(){
    const {user, setUser} = useAuth();
    const [editDialogOpen, setEditDialogOpen] = useState(false);
    const [newFirstName, setNewFirstName] = useState(user?.firstName || "");
    const [newLastName, setNewLastName] = useState(user?.lastName || "");
    const [image, setImage] = useState<File | null>(null);
    const [previewImage, setPreviewImage] = useState<string | null>(null);

    const handleOpenEditDialog = () => {
        setEditDialogOpen(true);
    };

    const handleCloseEditDialog = () => {
        setEditDialogOpen(false);
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setImage(file);

            const reader = new FileReader();
            reader.onload = () => {
                if (typeof reader.result === "string") {
                    setPreviewImage(reader.result);
                }
            };
            reader.readAsDataURL(file);
        }
    };

    const handleInvalidInput = () => {
        setNewFirstName(user?.firstName || "")
        setNewLastName(user?.lastName || "")
        setPreviewImage(`${process.env.NEXT_PUBLIC_ENV}/uploads/${user?.img}`)
    };

    const handleEditProfile = async (e: React.FormEvent) => {

        e.preventDefault();
        
        if (!user?.id) {
            console.error("User ID is missing");
            return;
        }

        try {

            const { data, errors, response } = await editUserProfileAction(user.id, {
                firstName: newFirstName,
                lastName: newLastName,
                img: image !== null ? image : undefined, 
            });

            if (errors) {
                const errorMessages = Object.values(errors).filter(msg => msg);
                const errorText = errorMessages.length > 1 ? errorMessages.join("\n ") : errorMessages[0];
                toast.error(`${errorText}`);
                handleInvalidInput()
                return;
            }

            if (response?.statusCode === 200) {
                toast.success("Edit profile successful");
                setUser(response?.data);
            }else{
                toast.error(`${response?.message}`);
                handleInvalidInput()
            }

        } catch(error){
            console.error("Error updating profile:", error);

        }finally{
            handleCloseEditDialog();
        }
    }


    return(
        <>
            <div className="flex justify-between">
                <div className="flex gap-4 text-lg items-center">
                    <PersonIcon />
                    <div className="font-medium">Profile</div>
                </div>
                <button
                    className="flex gap-2 items-center border-2 border-solid rounded-full px-4 py-1 cursor-pointer hover:bg-gray-100 transition"
                    onClick={handleOpenEditDialog}
                    >
                    <div>Edit Profile</div>
                    <CreateOutlinedIcon fontSize="small"/>
                </button>
                
            </div>


            <div className="flex justify-center pt-10 pb-0">
                {user?.img ? (
                    <Image
                        src={`${process.env.NEXT_PUBLIC_ENV}/uploads/${user.img}`}
                        alt={user.firstName}
                        width={256}
                        height={256}
                        className="w-64 h-64 object-cover rounded-full transition-all duration-150 ease-in-out hover:scale-110 cursor-pointer"
                    />
                    ) : (
                    <Avatar
                        className="w-64 h-64 text-7xl transition-all duration-150 ease-in-out hover:scale-110 cursor-pointer"
                        >{user?.firstName?.[0]?.toUpperCase() ?? "NPN"}</Avatar>
                )}
            </div>

            <div className="flex justify-center gap-4 items-center">
                <div className="font-semibold text-3xl">{user?.firstName}</div>
                <div className="font-semibold text-3xl">{user?.lastName}</div>
            </div>

            <div className="flex justify-center text-xl">{user?.email}</div>

            <Dialog open={editDialogOpen} onClose={handleCloseEditDialog} fullWidth maxWidth="sm">

                <DialogTitle className="flex justify-center font-medium mt-3">Edit Profile</DialogTitle>

                <div className="mt-3 flex justify-center ">
                    <input
                        id="fileInput"
                        type="file"
                        accept="image/*"
                        hidden
                        onChange={handleFileChange}
                    />
                    <div className="flex justify-center relative" onClick={() => document.getElementById("fileInput")?.click()}>
                        {user?.img ? (
                            <Image
                                src={ previewImage || `${process.env.NEXT_PUBLIC_ENV}/uploads/${user.img}`}
                                alt={user.firstName}
                                width={100}
                                height={100}
                                className="w-32 h-32 object-cover rounded-full cursor-pointer filter brightness-50"
                            />
                        ) : (
                            <Avatar
                                className="w-32 h-32 text-3xl cursor-pointer filter brightness-50"
                            >
                                {user?.firstName?.[0]?.toUpperCase() ?? "NPN"}
                            </Avatar>
                        )}

                        <div className="absolute inset-0 flex items-center justify-center cursor-pointer">
                            <PhotoIcon className="text-5xl text-white"/>
                        </div>
                    </div>
                    
                </div>


                <DialogContent>
                    <TextField
                        label="First name"
                        defaultValue={newFirstName || user?.firstName}
                        type="string"
                        onChange={(e) => {
                        const value = e.target.value;
                        if (/^[a-zA-Z]+$/.test(value) || value === "") {
                            setNewFirstName(value);
                        }
                        }}
                        fullWidth
                        margin="dense"
                        sx={{
                            "& .MuiOutlinedInput-root": {
                                "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                                    borderColor: "#F5533D",
                                },
                            },
                            "& .MuiInputLabel-root.Mui-focused": {
                                color: "#F5533D", 
                            },
                        }}
                    />

                    <TextField
                        label="Last name"
                        defaultValue={newLastName || user?.lastName}
                        type="string"
                        onChange={(e) => {
                        const value = e.target.value;
                        if (/^[a-zA-Z]+$/.test(value) || value === "") {
                            setNewLastName(value);
                        }
                        }}
                        fullWidth
                        margin="dense"
                        sx={{
                            "& .MuiOutlinedInput-root": {
                                "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                                    borderColor: "#F5533D",
                                },
                            },
                            "& .MuiInputLabel-root.Mui-focused": {
                                color: "#F5533D", 
                            },
                        }}
                    />
                </DialogContent>
                <DialogActions
                    sx={{
                        padding: "0px 24px 24px 24px"
                    }}
                >
                    <Button onClick={handleCloseEditDialog} color="error">Cancel</Button>
                    <Button 
                        onClick={handleEditProfile}
                        variant="contained"
                        sx={{
                            backgroundColor: "#F5533D",
                            "&:hover": {
                                backgroundColor: "#D24434",
                            }
                        }}
                    >Save</Button>
                </DialogActions>           
        </Dialog>            
        </>    
    )
}

