import type { AppDispatch } from "../store/store";

export interface newSData {
    apellido: string;
    name: string;
    age_Group: string;
    subscription: string;
    amount2Pay: number;
}

export interface newSubData {
    studentID: string;
    token: string;
    subscription: string;
    amount2Pay: number;
}

export interface updateSFData {
    studentID: string;
    token: string;
    updateData: {
        admin: {
            subscription?: {
                plan?: "trimestriel" | "carte";
                startDate?: Date;
                endDate?: Date;
                pointsLeft?: number;
                amount2Pay?: number;
            }
        },
        student: {
            apellido?: string;
            name?: string;
            subscription?: {
                plan?: "trimestriel" | "carte";
                startDate?: Date;
                endDate?: Date;
                pointsLeft?: number;
                amount2Pay?: number;
            };
        }

    };
}

export interface loadStudentsData {
    dispatch: AppDispatch,
}