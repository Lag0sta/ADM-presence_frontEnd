import { useAppSelector, useAppDispatch } from "./store/hooks";
import { useEffect, useState } from "react";

import { deleteStudentAttendanceRequest, deleteDateRequest, getAttendancesRequest } from "./api/attendanceRequest";
import { getAttendances, deleteStudenteAttendance, deleteDateAttendance } from "./store/reducers/attendance";

import type { handleMsgModalAction } from "./types/Types"

interface props {
  handleMsgModalAction: handleMsgModalAction
}
function AttendanceHistory({ handleMsgModalAction }: props) {
  const [page, setPage] = useState(1);
  const [ageGroup, setAgeGroup] = useState("all");
  const itemsPerPage = 1;
  const user = useAppSelector((state) => state.auth.value);

  const attendances: any[] = useAppSelector((state) => state.attendance.value);
  const dispatch = useAppDispatch()

  console.log("attendancesHERE", attendances);
  // Pagination
  const start = (page - 1) * itemsPerPage;
  const currentAttendances = attendances.slice(start, start + itemsPerPage);
  const totalPages = Math.ceil(attendances.length / itemsPerPage);

  // Load history
  useEffect(() => {
    const loadHistory = async () => {
      try {
        const response = await getAttendancesRequest();
        console.log("response", response);
        dispatch(getAttendances(response.data.sort((a: any, b: any) => b.attendanceDay.localeCompare(a.attendanceDay))));

      } catch (error) {
        console.error("Error data fetch:", error);
      }
    }
    loadHistory()
  }, []);

  const handleDeleteStudentAttendance = async (attendance: any, student: any) => {

    const dSData = { attendanceId: attendance._id, studentId: student._id, token: user.token };

    try {
      const response = await deleteStudentAttendanceRequest(dSData);

      if (!response.result) {
        handleMsgModalAction.setMsgModalContent({ result: response.result, message: response.message });
        handleMsgModalAction.setIsMsgModalOpen(true);
        return
      }

      console.log("response Attendance", response);
      dispatch(deleteStudenteAttendance({ attendanceId: attendance._id, studentId: student._id }));

    } catch (error) {
      console.error("Error during sign in:", error);
    }
  };

  const handleDeleteDate = async (attendance: any) => {
    const dDData = { attendanceId: attendance._id, token: user.token };
    try {
      const response = await deleteDateRequest(dDData);
      console.log("response Date", response, attendance._id);
      const attendanceID = attendance._id
      dispatch(deleteDateAttendance({ attendanceID }));

    } catch (error) {
      console.error("Error during sign in:", error);
    }
  }

  return (
    <div className="flex justify-evenly items-center ">

      {currentAttendances.map((attendance: any) => (

        <div key={attendance._id} className="landscape:xs:w-[28rem] flex flex-col">
          <div className="w-80 my-4 flex justify-evenly items-center bg-black text-[#FFCB00] rounded-lg">
            <div className="mr-2">
              <input type="radio"
                name="ageGroup ?"
                value="underaged"
                checked={ageGroup === "underaged"}
                onChange={(e) => setAgeGroup(e.target.value)}
              />
              Mineur
            </div>

            <div className="mx-2">
              <input type="radio"
                name="ageGroup"
                value="adult"
                checked={ageGroup === "adult"}
                onChange={(e) => setAgeGroup(e.target.value)}
              />
              Adultes
            </div>

            <div className="ml-2">
              <input type="radio"
                name="ageGroup"
                value="all"
                checked={ageGroup === "all"}
                onChange={(e) => setAgeGroup(e.target.value)}
              />
              Tous
            </div>
          </div>
          <div className="flex justify-between items-center">

            <div className="flex justify-start items-center w-fit px-6 py-1 bg-[#FFCB00] rounded-t-lg">
              <span className="text-gray-800 text-lg font-bold">
                Date:
                <span>{attendance.attendanceDay?.split("-").reverse().join("-")}</span>
              </span>

              <div className="ml-4 bg-[#FFCB00] text-gray-100 text-2xl rounded-tr-lg font-black ">
                {page !== 1 &&
                  <button
                    className="mouse-pointer"
                    disabled={page === 1}
                    onClick={() => setPage(page - 1)}
                  >
                    ←
                  </button>
                }
                {page !== totalPages &&
                  <button
                    className="mouse-pointer"
                    disabled={page === totalPages}
                    onClick={() => setPage(page + 1)}
                  >
                    →
                  </button>
                }
              </div>
            </div>


          </div>
          <div className="flex justify-between items-center bg-[#FFCB00] p-2 font-semibold border-[#FFCB00] text-white">
            <span className="w-fit  py-1  text-gray-800  rounded-t-lg ">
              nombre de présences : <span className="text-gray-800">
                {attendance?.students?.filter((student: any) => {
                  if (ageGroup === "all") return true;
                  return student.age_Group === ageGroup;
                }).length}
              </span>
            </span>
          </div>

          {attendance.students
            .filter((student: any) => {
              if (ageGroup === "all") return true;
              return student.age_Group === ageGroup;
            }).map((student: any) => (
              <div key={`${attendance._id}-${student._id ?? student}`}
                className=" grid grid-cols-[1fr_1fr_1fr] border-b-2 border-x-2 border-[#FFCB00]"
              >
                <div className="ml-2 flex justify-start ">
                  <span className="font-semibold">{student.apellido}</span>
                </div>
                <div className="">
                  <span className="pl-1">{student.name}</span>
                </div>
                <div className="flex justify-end items-end pr-20 hover:cursor-pointer">
                  <svg className="size-6"
                    xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"
                    onClick={() => handleDeleteStudentAttendance(attendance, student)}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                  </svg>

                </div>
              </div>
            ))}
          <div className="flex justify-end items-end hover:cursor-pointer">
            <span className="w-fit px-2 py-1 bg-gray-800 text-[#FFCB00]  rounded-b-lg"
              onClick={() => handleDeleteDate(attendance)}>Effacer la présence</span>
          </div>

        </div>

      ))}

    </div>

  )
}

export default AttendanceHistory
