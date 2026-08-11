import { getAttendancesRequest } from "../api/attendanceRequest";
import { getAttendances } from "../store/reducers/attendance";
import { getattendanceOfTheDay } from "../store/reducers/attendanceOfTheDay";

import type { loadAttendanceHystoryData } from "../types/attendanceType";


export async function loadAttendanceHistory(loadAttendanceHystoryData: loadAttendanceHystoryData) {
    const { dispatch } = loadAttendanceHystoryData
    try {
        const response = await getAttendancesRequest();
        const attendances = response.data;

        const todayBE = new Intl.DateTimeFormat("sv-SE", {
            timeZone: "Europe/Brussels",
        }).format(new Date()).replaceAll("-", "/");

        const todayAttendance = attendances.find(
            (a: any) => a.attendanceDay === todayBE
        );

        dispatch(getAttendances(attendances)); // historique complet

        if (todayAttendance) {
            dispatch(getattendanceOfTheDay(todayAttendance)); // slice séparé recommandé
        }

    } catch (error) {
        console.error("Error data fetch:", error);
    }
}