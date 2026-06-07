import {  useState } from "react";

import CheckAttendance from "./CheckAttendance.js";
import AttendanceHistory from "./AttendanceHistory.js";

function Attendance() {
  const [toggleState, setToggleState] = useState("option1");
  
  const handlePresence = () => {
    setToggleState("option1");
  }

  const handlePresenceHistory = () => {
    setToggleState("option2");
  }


  return (
    <div className=" w-full h-full mt-10 flex justify-evenly items-center ">
      <div className="w-max-full h-full  flex flex-col items-center ">
        <div className="my-5">
          <span className= {`p-2 rounded-l-full ${toggleState === "option1" ? "bg-[#FFCB00] text-white font-semibold"  : "bg-black text-[#FFCB00]"}`}
            onClick={handlePresence}>
            Présences
          </span>
          <span className={`p-2 rounded-r-full ${toggleState === "option2" ? "bg-[#FFCB00] text-white font-semibold"  : "bg-black text-[#FFCB00]"}`}
          onClick = {handlePresenceHistory}
          >
            Historique
          </span>
        </div>
        {toggleState === "option1" &&
        <CheckAttendance/>
        }
        {toggleState === "option2" &&
        <AttendanceHistory/>
        }
        
      </div>

    </div>
  )
}

export default Attendance
