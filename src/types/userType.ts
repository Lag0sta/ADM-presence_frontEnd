import type { AppDispatch } from "../store/store";

export interface getURData {
    apellido: string,
    token: string
}

export interface loadUserData{
    dispatch: AppDispatch,
    apellido: string,
    token: string
}

export interface updateUFData {
    updateData: {
        apellido?: string,
        name?: string;
        subscription?: {
            plan?: string | null;
            startDate?: Date;
            endDate?: string;
            pointsLeft?: number;
            amount2Pay?: number;
        };
    },
    token: string
}

export interface updateUIData {
    token: string,
    apellido?: string,
    email?: string,
    password?: string
}
