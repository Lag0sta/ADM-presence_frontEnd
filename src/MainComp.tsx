import CheckAttendance from "./CheckAttendance.tsx";
import AttendanceList from "./AttendanceList.tsx"
import Home from "./Home"

interface props {
    component: string;
    setIsModalOpen: (value: boolean) => void;
}

function MainComp({ component, setIsModalOpen } : props) {

  return (
    <div className="w-full h-full flex justify-evenly items-center ">
      {component === "home" && 
        <Home/>
      }
      {component === "checkAttendance" &&
        <CheckAttendance/>
      }
      {component === "attendanceList" &&
      <AttendanceList setIsModalOpen={setIsModalOpen}/>
  }
    </div>
  )
}

export default MainComp
