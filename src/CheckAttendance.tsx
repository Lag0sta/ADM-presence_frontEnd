function CheckAttendance() {

  return (
    <div className=" w-full h-full mt-10 flex justify-evenly items-center ">
      <div className="w-max-full h-full  flex flex-col items-center ">
        <div className="my-5">
          <span className="bg-black text-white p-2 rounded-l-full">Présences</span>
          <span className="bg-black text-white p-2 rounded-r-full">Historique</span>
        </div>
        <div className="  flex flex-col">
          <div className="grid grid-cols-[1fr_1fr_2fr_2fr_2fr_2fr] bg-[#FFCB00] p-2 font-semibold border-[#FFCB00] text-white">
            <span className=" ">Appelido :</span>
            <span className=" ">Nom :</span>
            <span>Type d'abonnement :</span>
            <span className="">Nombre de points restants :</span>
          </div>


        </div>
      </div>

    </div>
  )
}

export default CheckAttendance
