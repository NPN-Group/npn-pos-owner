"use client";
import { createContext } from 'react';
import { UserResponse } from '@/shared/types';

interface AuthContextType {
    user: UserResponse | null;
    setUser: (user: UserResponse | null) => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);
