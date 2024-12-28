"use client";
import { createContext } from 'react';
import { User } from '@/shared/types';

interface AuthContext {
    user?: User;
    setUser: (user?: User) => void;
}

export const AuthContext = createContext<AuthContext>(null!);
