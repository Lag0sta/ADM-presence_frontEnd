import { useAppSelector } from "./store/hooks";

import type { handleModalAction } from "./types/Types.ts"

interface props {
  handleModalAction: handleModalAction
}
function Home({ handleModalAction }: props) {

  const auth = useAppSelector((state) => state.auth.value);

  const handleSignIn = () => {
    handleModalAction.setIsModalOpen(true)
    handleModalAction.setModalComponent("signIn")
    console.log("Sign In clicked")
  }


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
