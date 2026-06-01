import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: {
      token: "",
      apellido: ""
  }
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    addAuth: (state,  action) => {
      state.value = action.payload
    },
    
    //Supprime les informations d'authentification.
    clearAuth: (state) => {
        state.value = initialState.value
    },
  },
});

export const {addAuth, clearAuth } = authSlice.actions;
export default authSlice.reducer;
