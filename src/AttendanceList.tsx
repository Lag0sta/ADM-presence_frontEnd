import type {handleModalAction} from "./types/Types.ts"
interface props {
  handleModalAction: handleModalAction
}

function AttendanceList({ handleModalAction } : props) {
const handleAddNew = () => {
  handleModalAction.setModalComponent("addAttendee")
  handleModalAction.setIsModalOpen(true)
}
  return (
    <div className="w-full h-full flex justify-evenly items-center ">
      <div className="w-[90%] flex flex-col">
        <span className="p-2 bg-gray-900 rounded-t-lg text-[#FFCB00] text-center"
        onClick={handleAddNew}>
          Ajouter
        </span>
        <div className="grid grid-cols-6 bg-[#FFCB00]  p-2 font-semibold border-[#FFCB00] text-white">
          <span>Appelido :</span>
          <span>Prénom :</span>
          <span>Nom :</span>
          <span>Nombre de présence :</span>
          <span>Type d'abonnement :</span>
          <span>Etat de l'abonnement :</span>
        </div>
        <div className="grid grid-cols-6 p-2 border-b-2 border-x-2  border-[#FFCB00]">
          <span>Caju</span>
          <span>Anouk</span>
          <span>C1secrèt</span>
          <span>28</span>
          <span>Trimestriel</span>
          <span>Actif</span>
        </div>
        <div className="grid grid-cols-6 p-2 border-b-2 border-x-2 border-[#FFCB00]">
          <span>Baia</span>
          <span>Juan</span>
          <span>Garcia</span>
          <span>32</span>
          <span>Carte de 10</span>
          <span>restant : 8</span>
        </div>

      </div>
    </div>
  )
}

export default AttendanceList
