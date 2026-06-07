import type { newAData, dSData, dDData } from "../types/attendanceAction";
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000';


export async function getAttendancesRequest() {
    try {
        const getAttendances = await fetch(`${API_URL}/attendances/`)
        const response = await getAttendances.json()

        return response
    } catch (error) {
        console.error("Error fetching students:", error);
    }
}

export async function NewAttendanceRequest(newAData: newAData) {
    const { students, token } = newAData

    try {
        const newAttendance = await fetch(`${API_URL}/attendances/addNewAttendance`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                students: students,
                token: token,
            })
        })
        const response = await newAttendance.json()
        console.log("response", response)

        return response

    } catch (error) {
        return error
    }
}

export async function deleteStudentRequest(dSData: dSData) {
    const { attendanceId, studentId, token } = dSData

    try {
        const deleteStudent = await fetch(`${API_URL}/attendances/deleteStudent`, {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                attendanceId: attendanceId,
                studentId: studentId,
                token: token,
            })
        })
        const response = await deleteStudent.json()
        console.log("responseDS", response)
    } catch (error) {
        return error
    }
}

export async function deleteDateRequest(dDData: dDData) {
    const { attendanceId, token } = dDData

    try {
        const deleteDate = await fetch(`${API_URL}/attendances/deleteDate/${attendanceId}`, {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                token: token,
            })
        })
        const response = await deleteDate.json()
        console.log("responseDD", response)
    } catch (error) {
        return error
    }
}
