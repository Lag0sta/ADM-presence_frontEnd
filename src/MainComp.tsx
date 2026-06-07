import Attendance from "./Attendance.tsx";
import AttendanceList from "./AttendanceList.tsx"
import Home from "./Home"

import type {handleModalAction} from "./types/Types.ts"

interface props {
    component: string;
    handleModalAction:handleModalAction
    setStudentSubscription: (value: any) => void;
}

function MainComp({ component, handleModalAction, setStudentSubscription
 } : props) {

  return (
    <div className="w-full h-full flex justify-evenly items-center ">
      {component === "home" && 
        <Home handleModalAction={handleModalAction}/>
      }
      {component === "checkAttendance" &&
        <Attendance/>
      }
      {component === "attendanceList" &&
      <AttendanceList handleModalAction={handleModalAction}
       setStudentSubscription={setStudentSubscription}/>
  }
    </div>
  )
}

export default MainComp
