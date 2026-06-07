import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: [{
    _id: "",
    date: "",
    students: [{
      apellido: "",
      name: "",
      _id: "",
    }]
  }]
};

const attendanceSlice = createSlice({
  name: "attendance",
  initialState,
  reducers: {
    getAttendances: (state, action) => {
      state.value = action.payload
    },


    deleteStudenteAttendance: (state, action) => {
      const { attendanceId, studentId } = action.payload;

      const attendance = state.value.find(
        a => a._id === attendanceId
      );

      if (attendance) {
        attendance.students = attendance.students.filter(
          student => student._id !== studentId
        );
      }
    },
    deleteDateAttendance: (state, action) => {
      const { attendanceId } = action.payload;

      state.value = state.value.filter(
        (attendance) => attendance._id !== attendanceId
      );
    }


  },
});

export const { getAttendances, deleteStudenteAttendance, deleteDateAttendance  } = attendanceSlice.actions;
export default attendanceSlice.reducer;
