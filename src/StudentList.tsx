
import { useState, useEffect } from "react";
import { useAppSelector, useAppDispatch } from "./store/hooks";
import { useXXXS, useXXS, useXS, useSM, useMD } from "./hooks/breakPoints"
import { useOrientation } from "./hooks/orientation";
import { loadStudents } from "./utils/studentAction"


import type { handleModalAction } from "./types/Types"

interface props {
  handleModalAction: handleModalAction
  setStudentSubscription: (value: any) => void;
  setStudentFile: (value: any) => void;
}

function StudentList({ handleModalAction, setStudentSubscription, setStudentFile }: props) {
  const isXXXS = useXXXS();
  const isXXS = useXXS();
  const isXS = useXS();
  const isSM = useSM();
  const isMD = useMD();

  console.log("isXXXS", isXXXS, "isXXS", isXXS, "isXS", isXS, "isSM", isSM, "isMD", isMD)
  const [ageGroup, setAgeGroup] = useState("all")
  const students: any[] = useAppSelector((state) => state.student.value);
  const auth = useAppSelector((state) => state.auth.value);
  const dispatch = useAppDispatch();
  const { isPortrait, isLandscape } = useOrientation();


  useEffect(() => {
    if (!auth.token) return
    const loadStudentsData = { dispatch }

    loadStudents(loadStudentsData)

  }, [auth.token]);

  //add new student
  const handleAddNewStudent = () => {
    handleModalAction.setModalComponent("addAttendee")
    handleModalAction.setIsModalOpen(true)
  }

  //student file
  const handleStudentFile = (student: any) => {
    console.log("Student File clicked for student:", student)
    setStudentFile(student)
    handleModalAction.setModalComponent("studentFile")
    handleModalAction.setIsModalOpen(true)
  }

  //new subscription
  const handleNewSubscription = (student: any) => {
    setStudentSubscription(student)
    handleModalAction.setModalComponent("newSubscription")
    handleModalAction.setIsModalOpen(true)
  }

  return (
    <div className="flex justify-center">
      <div className={(isPortrait && (isXXXS || isXXS || isXS || isSM )) ? "w-max-full h-full flex flex-col  items-center portrait:hidden " : "max-w-[95%] h-full  flex flex-col "}>
        <div className="flex justify-evenly items-center w-full h-fit mb-4 ">

          <span className="py-2 px-4 bg-gray-900 rounded-full text-[#FFCB00] text-center"
            onClick={handleAddNewStudent}>
            Nouvel Inscrit
          </span>

        </div>

        <div className=" flex flex-col landscape:xs:max-h-44 landscape:sm:max-h-56 landscape:md:max-h-96 landscape:lg:max-h-96 border-b-2 border-b-[#FFCB00]">
          <div className="w-80 flex justify-evenly items-center bg-black text-[#FFCB00] rounded-t-lg">
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
                name="ageGroup ? "
                value="adult"
                checked={ageGroup === "adult"}
                onChange={(e) => setAgeGroup(e.target.value)}
              />
              Adultes
            </div>

            <div className="ml-2">
              <input type="radio"
                name="ageGroup ? "
                value="all"
                checked={ageGroup === "all"}
                onChange={(e) => setAgeGroup(e.target.value)}
              />
              Tous
            </div>
          </div>
          <div className="grid xxxs:grid-cols-[1fr_1fr_1fr_1fr_1fr_1fr] grid-cols-[1fr_1fr_2fr_2fr_2fr_2fr] bg-[#FFCB00] p-2 font-semibold font-cascadiaCode  border-[#FFCB00] text-white rounded-tr-lg">

            <div className="ml-2 flex justify-start items-center">
              {!(isXS || isSM)? (
                <span className="text-lg  landscape:xl:text-2xl ">Appelido:</span>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                </svg>

              )
              }
            </div>
            <div className="flex justify-center items-center">
              {!(isXS || isSM)? (
                <span className="text-lg landscape:xl:text-2xl ">Nom:</span>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 9h3.75M15 12h3.75M15 15h3.75M4.5 19.5h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25v10.5A2.25 2.25 0 0 0 4.5 19.5Zm6-10.125a1.875 1.875 0 1 1-3.75 0 1.875 1.875 0 0 1 3.75 0Zm1.294 6.336a6.721 6.721 0 0 1-3.17.789 6.721 6.721 0 0 1-3.168-.789 3.376 3.376 0 0 1 6.338 0Z" />
                </svg>

              )}
            </div>
            <div className="flex justify-center items-center">
              {!(isXS || isSM)? (
                <span className="text-lg landscape:xl:text-2xl">Plan :</span>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 6v.75m0 3v.75m0 3v.75m0 3V18m-9-5.25h5.25M7.5 15h3M3.375 5.25c-.621 0-1.125.504-1.125 1.125v3.026a2.999 2.999 0 0 1 0 5.198v3.026c0 .621.504 1.125 1.125 1.125h17.25c.621 0 1.125-.504 1.125-1.125v-3.026a2.999 2.999 0 0 1 0-5.198V6.375c0-.621-.504-1.125-1.125-1.125H3.375Z" />
                </svg>
              )}
            </div>
            <div className="flex justify-center items-center">
              {!(isXS || isSM)? (
                <span className="text-lg landscape:xl:text-2xl">Date de fin:</span>

              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5" />
                </svg>

              )}
            </div>
            <div className="flex justify-center items-center">
              {!(isXS || isSM)? (
                <span className="text-lg landscape:xl:text-2xl">Points:</span>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
                </svg>
              )}
            </div>
            <div className="flex justify-center items-center">
              { !(isXS || isSM)? (
                <span className="text-lg landscape:xl:text-2xl">À payer:</span>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0 1 15.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 0 1 3 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 0 0-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 0 1-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 0 0 3 15h-.75M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm3 0h.008v.008H18V10.5Zm-12 0h.008v.008H6V10.5Z" />
                </svg>
              )}
            </div>
          </div>
          <div className="overflow-y-auto">
            {students.filter((student: any) => {
              if (ageGroup === "all") return true;
              return student.age_Group === ageGroup;
            }).sort((a: any, b: any) =>
              a.apellido.localeCompare(b.apellido)
            ).map((student: any) => (
              <div key={student._id}
                className="grid grid-cols-[1fr_1fr_1fr_1fr_1fr_1fr] border-t-2 border-x-2 border-[#FFCB00] landscape:xl:h-10"
              >
                <div className="ml-2 flex justify-start items-center ">
                  <span className="xxxs:text-sm font-bold cursor-pointer hover:text-[#FFCB00] landscape:sm:text-md landscape:md:text-lg landscape:xl:text-xl landscape:xl:font-semibold text-center"
                    onClick={() => handleStudentFile(student)}>{student.apellido}</span>
                </div>
                <div className="flex justify-center items-center">
                  <span className="pl-1 xxxs:text-xs text-sm text-center landscape:sm:text-sm landscape:md:text-md landscape:xl:text-lg landscape:xl:font-normal font-semibold">{student.name}</span>
                </div>
                <div className="flex justify-center items-center">
                  {student.subscription?.plan ? (
                    <div>

                      <span className=" xxxs:text-xs text-center landscape:sm:text-sm landscape:md:text-md landscape:lg:text-xl landscape:xl:text-xl  font-semibold">{student.subscription?.plan}</span>
                    </div>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 hover:cursor-pointer hover:text-[#FFCB00]"
                      onClick={() => handleNewSubscription(student)}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
                    </svg>
                  )}
                </div>
                {student.subscription?.plan === "trimestriel" || student.subscription?.plan === "annuel" ? (
                  <div className="flex justify-center items-center">
                    <span className=" xxxs:text-xs text-center landscape:sm:text-sm landscape:md:text-md landscape:xl:text-lg font-semibold">{new Date(student.subscription?.endDate)
                      .toLocaleDateString("fr-FR", { timeZone: "UTC" })
                      .replaceAll("/", "-")}
                    </span>
                  </div>
                ) : (
                  <div className="flex justify-center items-center bg-gray-400" />
                )}
                {student.subscription?.plan === "carte" ? (
                  <div className="flex justify-center items-center font-semibold">
                    <span className=" xxxs:text-xs landscape:sm:text-sm landscape:md:text-md landscape:xl:text-lg">{student.subscription?.pointsLeft}</span>
                  </div>
                ) : (
                  <div className="flex justify-center items-center bg-gray-400" />
                )}
                <div className="flex justify-end items-center">
                  <span className="pr-4 xxxs:text-xs landscape:sm:text-sm landscape:md:text-md landscape:xl:text-lg font-semibold">{student.subscription?.amount2Pay} €</span>
                </div>
              </div>
            ))}

          </div>
        </div>

        
      </div>
      {
          (isPortrait && (isXXXS || isXXS || isXS || isSM)) &&
          <div className="landscape:hidden">
            <span className="font-cascadiaCode font-semibold">
            Veuillez tourner l'écran

            </span>
          </div>
        }
    </div >
  )
}

export default StudentList
