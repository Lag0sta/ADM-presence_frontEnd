import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: [{
    _id: "",
    attendanceDay: "",
    createdAt: "",
    students: [{
      age_Group: "",
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
        console.log("PAYLOAD REDUX:", action.payload);

    },

    addStudentAttendance: (state, action) => {
      const { attendanceId, studentInfo } = action.payload;

      const attendance = state.value.find(
        a => a._id === attendanceId
      );

      if (attendance) {
        const alreadyExists = attendance.students.some(
          student => student._id === studentInfo._id
        );

        if (!alreadyExists) {
          attendance.students.push(studentInfo);
        }
      }
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

export const { getAttendances, deleteStudenteAttendance, deleteDateAttendance } = attendanceSlice.actions;
export default attendanceSlice.reducer;
