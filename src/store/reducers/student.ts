import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: [{
      _id: "",
      apellido: "",
      name: "",
      subscription: "",
      endDate: "",
      pointsLeft: 0,
      payementStatus: "",
      amount2Pay: 0
  }]
};

const studentSlice = createSlice({
  name: "student",
  initialState,
  reducers: {
    getStudents: (state,  action) => {
      state.value = action.payload
    },
    
    //Supprime les informations d'authentification.
    clearStudents: (state) => {
        state.value = initialState.value
    },
  },
});

export const {getStudents, clearStudents } = studentSlice.actions;
export default studentSlice.reducer;
