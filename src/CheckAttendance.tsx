import { useAppSelector, useAppDispatch } from "./store/hooks.js";
import { useState, useEffect, useMemo } from "react";

import { NewAttendanceRequest, addStudentAttendanceRequest, getAttendancesRequest } from "./utils/attendanceAction.js"

import { getAttendances } from "./store/reducers/attendance.js";

function CheckAttendance() {
  const user = useAppSelector((state) => state.auth.value);
  const students: any[] = useAppSelector((state) => state.student.value);
  const attendances: any[] = useAppSelector((state) => state.attendance.value);
  const [checkedUsers, setCheckedUsers] = useState<string[]>([]);
  const [testStudents, setTestStudents] = useState<string[]>([]);
  const [attendedStudent, setAttendedStudent] = useState<string[]>([]);

  const dispatch = useAppDispatch();

  const latestAttendance = useMemo(() => {
    return [...attendances]
      .sort((a, b) => b.attendanceDay.localeCompare(a.attendanceDay))[0];
  }, [attendances]);

  useEffect(() => {
    setAttendedStudent(
      latestAttendance?.students?.map((s: any) => s._id) ?? []
    );
  }, [latestAttendance]);

  useEffect(() => {
    const loadHistory = async () => {
      try {
        const response = await getAttendancesRequest();
        dispatch(getAttendances(response.data.sort((a: any, b: any) => b.attendanceDay.localeCompare(a.attendanceDay))));
      } catch (error) {
        console.error("Error data fetch:", error);
      }
    }
    loadHistory()
  }, []);

  const handleCheckboxChange = (studentId: string) => {
    if (checkedUsers.includes(studentId)) {
      setCheckedUsers(checkedUsers.filter((id) => id !== studentId));
    } else {
      setCheckedUsers([...checkedUsers, studentId]);
    }
  };
  console.log("date",);

  const handleSave = async () => {

    //enregistrer la date de la derniere fiche
    const attendanceDate = latestAttendance?.attendanceDay

    //date du jour en Belgique sous format AAAA/MM/JJ
    const date = new Date().toLocaleDateString("sv-SE", {
      timeZone: "Europe/Brussels",
    });
    const newAData = { students: checkedUsers, token: user.token };
    const addSAData = { attendanceID: latestAttendance?._id, studentID: checkedUsers, token: user.token };
    try {

      if (date !== attendanceDate) {
        const response = await NewAttendanceRequest(newAData);
        console.log("response new MF attendance", response);

        const newA = []
        newA.push(response.data)
        setTestStudents(response.data.students)
        dispatch(getAttendances(newA))
        setCheckedUsers([])
        return
      }

      if (date === attendanceDate) {
        const response = await addStudentAttendanceRequest(addSAData);
        setTestStudents([...testStudents, ...response.data.students]);
        const newA = [response.data];

        dispatch(getAttendances(newA))
        console.log('same date', response)
        setCheckedUsers([])
        return
      }

    } catch (error) {
      console.error("Error during sign in:", error);
    }
  };

  return (
    <div className=" w-full h-full flex justify-evenly items-center ">
      <div className="  flex flex-col">
        <span className="w-fit px-2 py-1 bg-gray-800 text-[#FFCB00]  rounded-t-lg">Date: {new Date(Date.now())
          .toLocaleDateString("fr-FR", { timeZone: "UTC" })
          .replaceAll("/", "-")}
        </span>
        <div className="grid grid-cols-[1fr_1fr_2fr_1fr] bg-[#FFCB00] p-2 rounded-tr-lg font-semibold border-[#FFCB00] text-white">
          <span className=" ">Appelido :</span>
          <span className=" ">Nom :</span>
          <span>Type d'abonnement :</span>
        </div>
        {students.map((student: any) => (
          <div key={student._id}
            className="grid grid-cols-[1fr_1fr_2fr_1fr] border-b-2 border-x-2 border-[#FFCB00]"
          >
            <div key={student._id} className="ml-2 flex justify-start ">
              <span className="font-semibold">{student.apellido}</span>
            </div>
            <div className="flex justify-center items-center">
              <span className="pl-1">{student.name}</span>
            </div>
            <div className="flex justify-center items-center">
              {student.subscription?.plan ? (
                <span>{student.subscription.plan}</span>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 hover:cursor-pointer hover:text-[#FFCB00]"
                // onClick={() => handleNewSubscription(student)}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
                </svg>
              )}
            </div>
            <input
              type="checkbox"
              disabled={
                (attendedStudent ?? []).includes(student._id) ||
                (testStudents ?? []).includes(student._id)
              }
              checked={checkedUsers.includes(student._id)}
              onChange={() => handleCheckboxChange(student._id)}
            />

          </div>
        ))}
        <div className="flex justify-center items-center my-5">
          <span className="w-fit py-2 px-4 bg-gray-900 rounded-full text-[#FFCB00] text-center"
            onClick={handleSave}>Enregistrer</span>

        </div>
      </div>
    </div>

  )
}

export default CheckAttendance
