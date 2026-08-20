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
        <div className="w-full h-full flex flex-col justify-evenly items-center my-2">
            <h3 className="text-3xl text-center text-white mb-1">
                Fiche {studentFile?.apellido}
            </h3>
            <div className="w-full px-6 flex justify-between items-center">
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
