import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: {
    _id: "",
    attendanceDay: "",
    createdAt: "",
    students: [{
      apellido: "",
      name: "",
      _id: "",
    }]
  }
};

const attendanceOfTheDaySlice = createSlice({
  name: "attendanceOfTheDay",
  initialState,
  reducers: {
    getattendanceOfTheDay: (state, action) => {
      state.value = action.payload
      console.log("PAYLOAD REDUX:", action.payload);

    },

    addStudentattendanceOfTheDay: (state, action) => {
      const { studentInfo } = action.payload;

      const attendance = state.value

      if (attendance) {
        const alreadyExists = attendance.students.some(student => student._id === studentInfo._id);

        if (!alreadyExists) {
          attendance.students.push(studentInfo);
        }
      }
    },


    deleteStudenteattendanceOfTheDay: (state, action) => {
      const { studentId } = action.payload;

      const attendance = state.value

      attendance.students = attendance.students.filter(student => student._id !== studentId)

    },
    deleteDateattendanceOfTheDay: (state, ) => {
      state.value = initialState.value
    }


  },
});

export const { getattendanceOfTheDay, addStudentattendanceOfTheDay, deleteStudenteattendanceOfTheDay, deleteDateattendanceOfTheDay } = attendanceOfTheDaySlice.actions;
export default attendanceOfTheDaySlice.reducer;
