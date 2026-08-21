import Attendance from "./Attendance";
import StudentList from "./StudentList"
import UserPage from "./UserPage";
import Home from "./Home"

import type {handleModalAction, handleMsgModalAction, handleAuthModalAction} from "./types/Types"

interface props {
    component: string;
    handleModalAction:handleModalAction
    handleMsgModalAction: handleMsgModalAction;
    handleAuthModalAction: handleAuthModalAction
    setStudentSubscription: (value: any) => void;
    setStudentFile: (value: any) => void;
}

function MainComp({ component, handleModalAction, handleMsgModalAction, handleAuthModalAction, setStudentSubscription, setStudentFile
 } : props) {

  return (
      <div className="w-full h-full flex justify-evenly items-center">
        {component === "home" && 
          <Home handleModalAction={handleModalAction}/>
        }
        {component === "checkAttendance" &&
          <Attendance handleMsgModalAction={handleMsgModalAction}/>
        }
        {component === "attendanceList" &&
        <StudentList handleModalAction={handleModalAction}
        setStudentSubscription={setStudentSubscription}
        setStudentFile={setStudentFile}/>
        }
        {component === "userPage" &&
          <UserPage handleModalAction={handleModalAction}
                    handleMsgModalAction={handleMsgModalAction}
                    handleAuthModalAction={handleAuthModalAction}/>
        }
      </div>
  )
}

export default MainComp
