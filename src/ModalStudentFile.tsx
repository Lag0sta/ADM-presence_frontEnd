import { useState } from "react";
import StudentFile from "./StudentFile";
import StudentFileUpdate from "./StudentFileUpdate"
import type { handleModalAction, handleMsgModalAction } from "./types/Types"


interface props {
    handleModalAction: handleModalAction;
    handleMsgModalAction: handleMsgModalAction
    studentFile: any;
    setStudentFile: (value: any) => void;
}
function ModalStudentFile({ handleModalAction, handleMsgModalAction, studentFile, setStudentFile }: props) {
    const [update, setUpdate] = useState(false)

    return (
        <div className="portrait:xxxs:h-[22rem] portrait:xxxs:w-[18rem]
        portrait:xxs:h-[30rem] portrait:xxs:w-[18rem]
        landscape:sm:h-[15.5rem]
        landscape:md:h-[19.5rem]
        landscape:lg:h-[22rem]
        landscape:xs:h-[11.5rem] landscape:xs:w-[25rem]  flex flex-col justify-evenly items-center ">
            <h3 className="w-full mb-5 py-2 bg-black text-4xl text-center text-white font-edoSZ">
                {studentFile?.apellido}
            </h3>
            <div className="w-fit h-full flex justify-between items-center overflow-y-auto">
                {!update &&
                    <StudentFile studentFile={studentFile}
                                 setUpdate={setUpdate} />
                }
                {update && 
                    <StudentFileUpdate handleModalAction={handleModalAction}
                                       handleMsgModalAction={handleMsgModalAction}
                                       setStudentFile={setStudentFile}
                                       studentFile={studentFile}
                                       setUpdate={setUpdate}
                                       update={update}/>
                }

            </div>

        </div>
    )
}

export default ModalStudentFile
