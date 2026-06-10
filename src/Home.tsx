import { useEffect } from "react";
import { useAppSelector, useAppDispatch } from "./store/hooks";
import { getStudents } from "./store/reducers/student.js";
import { getStudentsRequest } from "./utils/studentAction.js";

import type { handleModalAction } from "./types/Types.ts"

interface props {
  handleModalAction: handleModalAction
}
function Home({ handleModalAction }: props) {

  const auth = useAppSelector((state) => state.auth.value);
  const dispatch = useAppDispatch();

  const handleSignIn = () => {
    handleModalAction.setIsModalOpen(true)
    handleModalAction.setModalComponent("signIn")
    console.log("Sign In clicked")
  }

  useEffect(() => {
    if (!auth.token) return
    const initStudents = async () => {
      try {
        const students = await getStudentsRequest();
        console.log("Students fetched:", students);
        dispatch(getStudents(students.data));

      } catch (error) {
        console.error("Error fetching students:", error);
      }
    }
    initStudents();
  }, [auth.token]);

  return (
    <div className="w-full h-full flex justify-evenly items-center ">
      {!auth.token &&
        <div className=" flex items-center bg-[#FFCB00] rounded-full p-2 font-semibold border-[#FFCB00] text-white">
          <span onClick={handleSignIn}>Connexion</span>
        </div>
      }
    </div>
  )
}

export default Home
