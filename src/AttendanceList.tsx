  import { useAppSelector } from "./store/hooks.js";
  import type { handleModalAction } from "./types/Types.ts"
  interface props {
    handleModalAction: handleModalAction
    setStudentSubscription: (value: any) => void;
  }

  function AttendanceList({ handleModalAction, setStudentSubscription }: props) {
    const students: any[] = useAppSelector((state) => state.student.value);

    const handleAddNew = () => {
      handleModalAction.setModalComponent("addAttendee")
      handleModalAction.setIsModalOpen(true)
    }

    const handleNewSubscription = (student: any) => {
      console.log("New Subscription clicked for student:", student)
      setStudentSubscription(student)
      handleModalAction.setModalComponent("newSubscription")
      handleModalAction.setIsModalOpen(true)
    }

    console.log("test2", students.map((s: any) => s.apellido))
    return (
      <div className="w-max-full h-full mt-15 flex flex-col  items-center ">
        <div className="flex justify-evenly items-center w-full h-fit mb-4">
          <span className="py-2 px-4 bg-gray-900 rounded-full text-[#FFCB00] text-center"
            onClick={handleAddNew}>
            Nouvel Inscrit
          </span>
        </div>
        <div className="  flex flex-col">
          <div className="grid grid-cols-[1fr_1fr_2fr_2fr_2fr_2fr] bg-[#FFCB00] p-2 font-semibold border-[#FFCB00] text-white rounded-t-lg">
            <div className="flex justify-center items-center">

              <span className="text-lg  ">Appelido :</span>
            </div>
            <div className="flex justify-center items-center">
              <span className="text-lg  ">Nom :</span>
            </div>
            <div className="flex justify-center items-center">

              <span className="text-lg ">Type d'abonnement :</span>
            </div>
            <div className="flex justify-center items-center">
              <span className="text-lg ">Fin de l'abonnement :</span>
            </div>
            <div className="flex justify-center items-center">
              <span className="text-lg ">Nombre de points restants :</span>
            </div>
            <div className="flex justify-center items-center">
              <span className="text-lg ">Montant à payer :</span>
            </div>
          </div>

          {students.map((student: any) => (
            <div key={student._id}
              className="grid grid-cols-[1fr_1fr_2fr_2fr_2fr_2fr] border-b-2 border-x-2 border-[#FFCB00]"
            >
              <div className="ml-2 flex justify-start ">
                <span className="font-semibold">{student.apellido}</span>
              </div>
              <div className="flex justify-center items-center">
                <span className="pl-1">{student.name}</span>
              </div>
              <div className="flex justify-center items-center">
                {student.subscription ? (
                  <span>{student.subscription}</span>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 hover:cursor-pointer hover:text-[#FFCB00]"
                    onClick={() => handleNewSubscription(student)}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
                  </svg>
                )}
              </div>
              {student.subscription !== "trimestriel" ? (
                <div className="flex justify-center items-center bg-gray-400" />
              ) : (
                <div className="flex justify-center items-center">
            z      <span>{new Date(student.endDate)
                    .toLocaleDateString("fr-FR", { timeZone: "UTC" })
                    .replaceAll("/", "-")}
                  </span>
                </div>
              )}
              {student.subscription !== "carte" ? (
                <div className="flex justify-center items-center bg-gray-400" />
              ) : (
                <div className="flex justify-center items-center">
                  <span >{student.pointsLeft}</span>
                </div>
              )}
              <div className="flex justify-center items-center">
                <span className="pl-4">{student.amount2Pay}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  export default AttendanceList
