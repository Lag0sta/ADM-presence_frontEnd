import Attendance from "./Attendance";
import AttendanceList from "./AttendanceList"
import UserPage from "./UserPage";
import Home from "./Home"

import type {handleModalAction, handleMsgModalAction} from "./types/Types"

interface props {
    component: string;
    handleModalAction:handleModalAction
    handleMsgModalAction: handleMsgModalAction;
    setStudentSubscription: (value: any) => void;
    setStudentFile: (value: any) => void;
}

function MainComp({ component, handleModalAction, handleMsgModalAction, setStudentSubscription, setStudentFile
 } : props) {


  return (
    <div className="w-full h-full flex justify-evenly items-center ">
      {component === "home" && 
        <Home handleModalAction={handleModalAction}
              handleMsgModalAction={handleMsgModalAction}/>
      }
      {component === "checkAttendance" &&
        <Attendance/>
      }
      {component === "attendanceList" &&
      <AttendanceList handleModalAction={handleModalAction}
       setStudentSubscription={setStudentSubscription}
       setStudentFile={setStudentFile}/>
      }
      {component === "userPage" &&
        <UserPage/>
      }
    </div>
  )
}

export default MainComp
