import { createSlice } from "@reduxjs/toolkit";

type SubscriptionType =
  | {
      plan: "trimestriel";
      startDate: string;
      endDate: string;
      amount2Pay: number;
      pointsLeft?: never;
    }
  | {
      plan: "carte";
      pointsLeft: number;
      amount2Pay: number;
      startDate?: never;
      endDate?: never;
    }
  | {
      plan: "annuel";
      pointsLeft: number;
      amount2Pay: number;
      startDate?: never;
      endDate?: never;
    };

interface Student {
  _id: string;
  apellido: string;
  name: string;
  age_Group: string;
  subscription: SubscriptionType;
  isAdmin: boolean;
}

interface StudentState {
  value: Student[];
}

const initialState: StudentState = {
  value: []
};

const studentSlice = createSlice({
  name: "student",
  initialState,
  reducers: {
    getStudents: (state, action) => {
      state.value = action.payload
    },

    //Supprime les informations d'authentification.
    clearStudents: (state) => {
      state.value = initialState.value
    },
  },
});

export const { getStudents, clearStudents } = studentSlice.actions;
export default studentSlice.reducer;
