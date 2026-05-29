interface props {
    setComponent: (component: string) => void;
  }

function Header({ setComponent } : props ){


  
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

  return (
    <div className="w-full h-full flex justify-evenly items-center ">
          {/* Text Explicatif - Login   */}
          <span onClick={handleHome}>Home</span>
          {/* Possibilité de cliquer la présence    */}
          <span onClick={handleCheckAttendance}>Présences</span>
          {/* Ajout d'un nouvel inscrit - état de l'abonnement - type d'abonnement - où en est le paiement - nombre de présence   */}
          <span onClick={handleAttendanceList}>Liste des Inscrits</span>
    </div>
  )
}

export default Header
