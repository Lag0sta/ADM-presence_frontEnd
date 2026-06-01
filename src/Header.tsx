import { useAppSelector } from "./store/hooks";
import type {handleModalAction} from "./types/Types.ts"
interface props {
    handleModalAction: handleModalAction
    setComponent: (value: string) => void;
  }

function Header({ handleModalAction, setComponent } : props ){

const auth = useAppSelector((state) => state.auth.value);
console.log("auth dans Header:", auth);
  const handleHome = ()  => {
    console.log("Home clicked")
    setComponent("home")
  }

  const handleCheckAttendance = () => {
    console.log("Check Attendance clicked")
    setComponent("checkAttendance")
  }

  const handleAttendanceList = () => {
    console.log("Attendance List clicked")
    setComponent("attendanceList")
  }

  const handleUserModal = () => {
    console.log("User Modal clicked")
    handleModalAction.setModalComponent("userModal")
    handleModalAction.setIsModalOpen(true)
  }

  return (
    <div className="w-full h-full flex justify-evenly items-center ">
        
      {!auth.token &&
      <h2>Bienvenue sur ADM Présence</h2>}
      {auth.token &&
      <div className="w-full h-full flex justify-evenly items-center ">
          <span onClick={handleHome}>Home</span>
          {/* Possibilité de cliquer la présence    */}
          <span onClick={handleCheckAttendance}>Présences</span>
          {/* Ajout d'un nouvel inscrit - état de l'abonnement - type d'abonnement - où en est le paiement - nombre de présence   */}
          <span onClick={handleAttendanceList}>Liste des Inscrits</span>
          <div className=" w-18 bg-[#FFCB00] rounded-full flex justify-center items-center"
          onClick={handleUserModal}>
            <img className="w-fit" src="../public/BanderoleFuzue.png"/>
          </div>
          </div>
      }
          
    </div>
  )
}

export default Header
