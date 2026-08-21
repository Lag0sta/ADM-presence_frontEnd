import { useAppSelector } from "./store/hooks";
import type {handleModalAction} from "./types/Types"
interface props {
    handleModalAction: handleModalAction
    setComponent: (value: string) => void;
  }

function Header({ handleModalAction, setComponent } : props ){

const auth = useAppSelector((state) => state.auth.value) || "";

// const handleHome = ()  => {
//     setComponent("home")
//   }

  const handleCheckAttendance = () => {
    setComponent("checkAttendance")
  }

  const handleAttendanceList = () => {
    setComponent("attendanceList")
  }

  const handleUserModal = () => {
    handleModalAction.setModalComponent("userModal")
    handleModalAction.setIsModalOpen(true)
  }

  return (
    <div className="w-full h-full flex justify-evenly items-center ">
        
      {!auth.token &&
      <h2 className=" xxxs:portrait:text-base xxxs:landscape:text-sm xxs:text-lg 2xl:portrait:text-3xl 2xl:landscape:text-4xl font-cascadiaCode ">Bienvenue sur <span className=" xxxs:portrait:text-xl xxxs:landscape:text-lg xxs:text-2xl 2xl:landscape:text-7xl 2xl:portrait:text-5xl text-[#FFCB00] font-edoSZ ">ADM Présence</span></h2>}
      {auth.token &&
      <div className="w-full h-full flex justify-evenly items-center ">
          {/* <span className="font-cascadiaCode xxxs:text-base xxs:text-lg  sm:text-xl 2xl:text-5xl" onClick={handleHome}>Home</span> */}
          {/* Possibilité de cliquer la présence    */}
          <span className=" xxxs:text-lg xxs:text-lg sm:text-xl 2xl:text-5xl font-cascadiaCode cursor-pointer hover:text-[#FFCB00]" onClick={handleCheckAttendance}>Présences</span>
          {/* Ajout d'un nouvel inscrit - état de l'abonnement - type d'abonnement - où en est le paiement - nombre de présence   */}
          <span className="xxxs:text-lg xxs:text-lg  sm:text-xl 2xl:text-5xl font-cascadiaCode cursor-pointer hover:text-[#FFCB00]" onClick={handleAttendanceList}>Inscrits</span>
          <div className="xxxs:portrait:w-15 xxxs:landscape:w-14 xxxs:landscape:my-2 xxs:w-17 sm:w-18 2xl:w-42 w-18 bg-[#FFCB00] rounded-full flex justify-center items-center cursor-pointer "
          onClick={handleUserModal}>
            <img className="w-fit" src="BanderoleFuzue.png"/>
          </div>
          </div>
      }
          
    </div>
  )
}

export default Header
