import { useEffect, useState } from "react";
import { useAppSelector, useAppDispatch } from "./store/hooks";
import UserFile from "./UserFile";
import { getUserRequest } from "./utils/userAction";
import { clearUser, getUser } from "./store/reducers/user";
import type { handleMsgModalAction, handleAuthModalAction } from "./types/Types";

interface props {
  handleMsgModalAction: handleMsgModalAction
  handleAuthModalAction: handleAuthModalAction
}

function UserPage({ handleMsgModalAction, handleAuthModalAction }: props) {
  const auth = useAppSelector((state) => state.auth.value);
  const user = useAppSelector((state) => state.user.value);

  const baseApellido = user?.apellido || "";
  const baseName = user?.name || "";
  const [apellido, setApellido] = useState(baseApellido);
  const [name, setName] = useState(baseName);
  const [update, setUpdate] = useState(false)
  const dispatch = useAppDispatch();

  console.log("User", user, "yeah");

  useEffect(() => {
    if (!auth.token) return
    const userPage = async () => {
      try {
        const getURData = { apellido: auth.apellido, token: auth.token };
        console.log("getURData:", getURData);
        const students = await getUserRequest(getURData);

        if (!students.result) {
          console.error("Error fetching user:", students.message);
          return;
        }
        console.log("Students fetched:", students);
        dispatch(getUser(students.data));

      } catch (error) {
        console.error("Error fetching students:", error);
      }
    }
    userPage();
  }, [auth.token]);

  const handleUpdatePassword = () => {
    console.log("click");
  }

  const handleUpdateEmail = () => {
    console.log("click");
  }

  return (
    <div className="w-full h-full flex flex-col items-center justify-center">

      <div className="w-5/6 h-fit py-10 flex flex-col items-center justify-center bg-[#FFCB00] rounded-lg ">
        <div className="h-20 flex items-center justify-center gap-2 ">

          <h3 className="text-4xl font-semibold">{user.apellido}</h3>
          <div className="h-10 flex justify-start items-start cursor-pointer hover:scale-110 transition-transform duration-300 ">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="white" className="size-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
            </svg>
          </div>
        </div>

        <div className="w-full flex flex-row items-center justify-center ">
                  <UserFile handleMsgModalAction={handleMsgModalAction}
                            handleAuthModalAction={handleAuthModalAction}
                            update={update} 
                            setUpdate={setUpdate}
                            />


          <div className="w-2/6 h-full flex flex-col gap-2 mt-30 pl-4 ">
            <button className="w-65 bg-gray-900 text-[#FFCB00] rounded-full py-1 px-4 ml-2 hover:bg-gray-800 hover:text-[#FFCB00] transition-colors duration-300 disabled:bg-[#FFCB00] disabled:text-gray-500 disabled:border-2 disabled:border-white "
              disabled={update}
              onClick={handleUpdatePassword}>
              modifier le mot de passe :
            </button>
            <button className="w-65 bg-gray-900 text-[#FFCB00] rounded-full py-1 px-2 ml-2 hover:bg-gray-800 hover:text-[#FFCB00] transition-colors duration-300 disabled:bg-[#FFCB00] disabled:text-gray-500 disabled:border-2 disabled:border-white " 
                    disabled={update}
                    onClick={handleUpdateEmail}>
              modifier l'adresse @mail :
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UserPage 
