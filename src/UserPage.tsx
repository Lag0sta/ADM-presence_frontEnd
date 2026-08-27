import { useEffect, useState } from "react";
import { useAppSelector, useAppDispatch } from "./store/hooks";
import UserFile from "./UserFile";
import {loadUser} from "./utils/userAction"

import type { handleModalAction, handleMsgModalAction, handleAuthModalAction } from "./types/Types";

interface props {
  handleModalAction: handleModalAction
  handleMsgModalAction: handleMsgModalAction
  handleAuthModalAction: handleAuthModalAction
}

function UserPage({ handleModalAction, handleMsgModalAction, handleAuthModalAction }: props) {
  const auth = useAppSelector((state) => state.auth.value);
  const user = useAppSelector((state) => state.user.value);
  
  const [update, setUpdate] = useState(false)
  const dispatch = useAppDispatch();

  console.log("User", user, "yeah");

  useEffect(() => {
    if (!auth.token) return

    const loadUserData = { apellido: auth.apellido, token: auth.token, dispatch };
    loadUser(loadUserData);

  }, [auth, dispatch]);

  const handleUpdatePassword = () => {
    handleModalAction.setModalComponent("updatePassword")
    handleModalAction.setIsModalOpen(true)
  }

  const handleUpdateEmail = () => {
    handleModalAction.setModalComponent("updateEmail")
    handleModalAction.setIsModalOpen(true)
  }

  const handleApellido = () => {
    handleModalAction.setModalComponent("updateApellido")
    handleModalAction.setIsModalOpen(true)
  }

  return (
    <div className="h-full w-screen flex flex-col ">

      <div className="h-full flex flex-col items-center bg-[#FFCB00] ">
        <div className="mt-5 flex items-center justify-center landscape:lg:mb-10 ">

          <h3 className="text-4xl landscape:lg:text-6xl  text-white font-semibold font-edoSZ ">{user.apellido}</h3>
          {!update &&
          <div className="h-10 flex justify-start items-start cursor-pointer hover:scale-110 transition-transform duration-300 ">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="black" className="size-6" onClick={handleApellido} >
              <path  strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
            </svg>
          </div>
          }
          
        </div>

        <div className=" flex portrait:flex-col landscape:flex-row  items-center justify-center ">
                  <UserFile handleMsgModalAction={handleMsgModalAction}
                            handleAuthModalAction={handleAuthModalAction}
                            update={update} 
                            setUpdate={setUpdate}
                            />

          <div className="h-full flex flex-col justify-center items-center  ">
            <button className="landscape:xs:w-[12rem] bg-gray-900 text-[#FFCB00]  rounded-full portrait:px-2 portrait:py-1 landscape:my-1  hover:bg-gray-800 hover:text-[#FFCB00] disabled:bg-[#FFCB00] disabled:text-gray-500 disabled:border-2 disabled:border-white "
              disabled={update}
              onClick={handleUpdatePassword}>
                <span className="portrait:xxxs:text-sm portrait:xxs:text-base font-cascadiaCode ">
              nouveau mot de passe:

                </span>
            </button>
            <button className="landscape:xs:w-[12rem] bg-gray-900 text-[#FFCB00] rounded-full portrait:px-4 portrait:py-1 my-1  px-1  hover:bg-gray-800 hover:text-[#FFCB00] transition-colors duration-300 disabled:bg-[#FFCB00] disabled:text-gray-500 disabled:border-2 disabled:border-white " 
                    disabled={update}
                    onClick={handleUpdateEmail}>
                      <span className="portrait:xxxs:text-sm portrait:xxs:text-base font-cascadiaCode ">
              modifier l'@mail :
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UserPage 
