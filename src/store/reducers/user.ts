import { createSlice } from "@reduxjs/toolkit";


const initialState = {
  value: {
    apellido: "",
    name: "",
    subscription: {
      plan: "trimestriel",
      startDate: "",
      endDate: "",
      pointsLeft: 0,
      amount2Pay: 0,
    },
    isAdmin: false
  }
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    getUser: (state, action) => {
      state.value = action.payload
    },

    //Supprime les informations d'authentification.
    clearUser: (state) => {
      state.value = initialState.value
    },
  },
});

export const { getUser, clearUser    } = userSlice.actions;
export default userSlice.reducer;
