import { useState } from "react";

import CheckAttendance from "./CheckAttendance";
import AttendanceHistory from "./AttendanceHistory";
import { useXXXS, useXXS, useXS, useSM, useMD } from "./hooks/breakPoints";
import type { handleMsgModalAction } from "./types/Types";
import { useOrientation } from "./hooks/orientation";

interface props {
  handleMsgModalAction: handleMsgModalAction
}
function Attendance({ handleMsgModalAction }: props) {
  const isXXXS = useXXXS();
  const isXXS = useXXS();
  const isXS = useXS();
  const isSM = useSM();
  const isMD = useMD();
  const [toggleState, setToggleState] = useState("option1");
  const { isPortrait, } = useOrientation();

  const handlePresence = () => {
    setToggleState("option1");
  }

  const handlePresenceHistory = () => {
    setToggleState("option2");
  }

  return (
    <div className=" w-full h-full flex justify-evenly items-center">
      <div className={(isPortrait && (isXXXS || isXXS || isXS || isSM)) ? "w-full h-full flex flex-col items-center portrait:hidden" : "w-max-full h-full  flex flex-col items-center "}>
        <div className="my-5 ">
          <span className={`p-2 rounded-l-full ${toggleState === "option1" ? "bg-[#FFCB00] text-white font-semibold" : "bg-black text-[#FFCB00]"}`}
            onClick={handlePresence}>
            Présences
          </span>
          <span className={`p-2 rounded-r-full ${toggleState === "option2" ? "bg-[#FFCB00] text-white font-semibold" : "bg-black text-[#FFCB00]"}`}
            onClick={handlePresenceHistory}
          >
            Historique
          </span>
        </div>
        <div className="w-full  overflow-hidden">
        {toggleState === "option1" &&
          <CheckAttendance />
        }
        {toggleState === "option2" &&
          <AttendanceHistory handleMsgModalAction={handleMsgModalAction} />
        }
        </div>
      </div>
      {
        (isPortrait && (isXXXS || isXXS || isXS || isSM)) &&
        <div className="landscape:hidden">
          <span className="font-cascadiaCode font-semibold">
            Veuillez tourner l'écran

          </span>
        </div>
      }
    </div>
  )
}

export default Attendance
