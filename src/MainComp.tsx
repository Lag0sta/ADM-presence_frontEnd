import CheckAttendance from "./CheckAttendance.tsx";
import AttendanceList from "./AttendanceList.tsx"
import Home from "./Home"

import type {handleModalAction} from "./types/Types.ts"

interface props {
    component: string;
    handleModalAction:handleModalAction
}

function MainComp({ component,     handleModalAction:handleModalAction
 } : props) {

  return (
    <div className="w-full h-full flex justify-evenly items-center ">
      {component === "home" && 
        <Home handleModalAction={handleModalAction}/>
      }
      {component === "checkAttendance" &&
        <CheckAttendance/>
      }
      {component === "attendanceList" &&
      <AttendanceList handleModalAction={handleModalAction}/>
  }
    </div>
  )
}

export default MainComp
