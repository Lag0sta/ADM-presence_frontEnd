import { useAppSelector } from "./store/hooks";

import type { handleModalAction } from "./types/Types"

interface props {
  handleModalAction: handleModalAction
}

function Home({ handleModalAction }: props) {

  const auth = useAppSelector((state) => state.auth.value);

  const handleSignIn = () => {
    handleModalAction.setIsModalOpen(true)
    handleModalAction.setModalComponent("signIn")
  }

  return (
    <div className="w-full h-full flex justify-evenly items-center ">
        {!auth.token &&
          <div className=" flex items-center bg-[#FFCB00] border-2 border-[#FFCB00]  rounded-full p-2 border-[#FFCB00] hover:bg-white ">
            <span className="xxxs:portrait:px-2 xxxs:portrait:py-1 xxxs:portrait:text-xl xxxs:landscape:px-2 xxxs:landscape:py-1 xxxs:landscape:text-xl xxs:px-3 xxs:py-2 xxs:text-3xl sm:text-2xl 2xl:text-5xl 2xl:px-5 2xl:py-4 font-cascadiaCode font-semibold text-white cursor-pointer hover:text-[#FFCB00]" onClick={handleSignIn}>Connexion</span>
          </div>
        }

      {auth.token &&
        <div className="w-full py-1 flex justify-center items-center bg-black ">
          <span className="m-1 xxxs:text-xl xxs:text-2xl sm:text-2xl 2xl:text-5xl text-white font-cascadiaCode font-semibold">Bonjour <span className="xxxs:text-2xl xxs:text-3xl xxs:text-3xl sm:text-3xl 2xl:text-7xl text-[#FFCB00] font-edoSZ ">{auth.apellido}</span></span>
        </div>
      }
    </div>
  )
}

export default Home
