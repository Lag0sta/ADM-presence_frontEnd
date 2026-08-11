import { getStudents } from "../store/reducers/students";
import { getStudentsRequest } from "../api/studentRequest";
import type { loadStudentsData } from "../types/studentType";

export async function loadStudents(loadStudentsData: loadStudentsData) {
    const { dispatch } = loadStudentsData
    try {
        const students = await getStudentsRequest();
        console.log("Students fetched:", students);
        dispatch(getStudents(students.data));

    } catch (error) {
        console.error("Error fetching students:", error);
    }
}
