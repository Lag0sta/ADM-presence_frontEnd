
import { useState, useEffect } from "react";
import { useAppSelector, useAppDispatch } from "./store/hooks";
import { useOrientation } from "./hooks/orientation";
import { useXXXS } from "./hooks/breakPoints"
import { loadStudents } from "./utils/studentAction"

import type { handleModalAction } from "./types/Types"

interface props {
  handleModalAction: handleModalAction
  setStudentSubscription: (value: any) => void;
  setStudentFile: (value: any) => void;
}

function StudentList({ handleModalAction, setStudentSubscription, setStudentFile }: props) {
  const isXXXS = useXXXS();
  const { isPortrait, isLandscape } = useOrientation();


  const [ageGroup, setAgeGroup] = useState("all")
  const students: any[] = useAppSelector((state) => state.student.value);
  const auth = useAppSelector((state) => state.auth.value);
  const dispatch = useAppDispatch();

  console.log("STUDENTS", students)
  console.log("find", students.filter(s => s.age_Group === "adult"))

  useEffect(() => {
    if (!auth.token) return
    const loadStudentsData = { dispatch }

    loadStudents(loadStudentsData)

  }, [auth.token]);

  
 useEffect(() => {
  if (!isPortrait) return;

  const lockLandscape = async () => {
    try {
      await screen.orientation.lock("landscape");
      console.log("Orientation verrouillée !");

    } catch (error) {
      console.warn(
        "Impossible de verrouiller l'orientation :",
        error
      );
    }
  };

  lockLandscape();

  return () => {
    screen.orientation.unlock();
  };
}, [isXXXS, isPortrait]);

  console.log("isLandscape", isLandscape);

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
    <div className="w-max-full h-full mt-15 flex flex-col  items-center ">
      <div className="flex justify-evenly items-center w-full h-fit mb-4">

        <span className="py-2 px-4 bg-gray-900 rounded-full text-[#FFCB00] text-center"
          onClick={handleAddNewStudent}>
          Nouvel Inscrit
        </span>

      </div>

      <div className=" flex flex-col">
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
        <div className="grid grid-cols-[1fr_1fr_2fr_2fr_2fr_2fr] bg-[#FFCB00] p-2 font-semibold border-[#FFCB00] text-white rounded-tr-lg">

          <div className="flex justify-center items-center">
            <span className="text-lg  ">Appelido:</span>
          </div>
          <div className="flex justify-center items-center">
            <span className="text-lg  ">Nom:</span>
          </div>
          <div className="flex justify-center items-center">

            <span className="text-lg ">Abonnement:</span>
          </div>
          <div className="flex justify-center items-center">
            <span className="text-lg ">Expiration:</span>
          </div>
          <div className="flex justify-center items-center">
            <span className="text-lg ">Points:</span>
          </div>
          <div className="flex justify-center items-center">
            <span className="text-lg ">À payer:</span>
          </div>
        </div>

        {students.filter((student: any) => {
          if (ageGroup === "all") return true;
          return student.age_Group === ageGroup;
        }).sort((a: any, b: any) =>
          a.apellido.localeCompare(b.apellido)
        ).map((student: any) => (
          <div key={student._id}
            className="grid grid-cols-[1fr_1fr_2fr_2fr_2fr_2fr] border-b-2 border-x-2 border-[#FFCB00]"
          >
            <div className="ml-2 flex justify-start ">
              <span className="font-bold hover:text-[#FFCB00]"
                onClick={() => handleStudentFile(student)}>{student.apellido}</span>
            </div>
            <div className="flex justify-center items-center">
              <span className="pl-1 text-sm">{student.name}</span>
            </div>
            <div className="flex justify-center items-center">
              {student.subscription?.plan ? (
                <span>{student.subscription?.plan}</span>
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
                <span>{new Date(student.subscription?.endDate)
                  .toLocaleDateString("fr-FR", { timeZone: "UTC" })
                  .replaceAll("/", "-")}
                </span>
              </div>
            ) : (
              <div className="flex justify-center items-center bg-gray-400" />
            )}
            {student.subscription?.plan === "carte" ? (
              <div className="flex justify-center items-center">
                <span >{student.subscription?.pointsLeft}</span>
              </div>
            ) : (
              <div className="flex justify-center items-center bg-gray-400" />
            )}
            <div className="flex justify-center items-center">
              <span className="pl-4">{student.subscription?.amount2Pay} €</span>
            </div>
          </div>
        ))}

      </div>
    </div>
  )
}

export default StudentList
