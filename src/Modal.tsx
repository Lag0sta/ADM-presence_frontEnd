import ModalAddStudent from "./ModalAddStudent";
import ModalNewSubscription from "./ModalNewSubscription";
import SignIn from "./SignIn";
import ModalUser from "./ModalUser";
import ModalStudentFile from "./ModalStudentFile";
import ModalUpdateLogInfo from "./ModalUpdateLogInfo";

import type { handleModalAction, handleMsgModalAction } from "./types/Types"

interface props {
  handleModalAction: handleModalAction
  handleMsgModalAction: handleMsgModalAction
  setComponent: (value: string) => void;
  setStudentSubscription: (value: any) => void;
  studentSubscription: any;
  studentFile: any;
  setStudentFile: (value: any) => void;
}
function Modal({ handleModalAction, handleMsgModalAction, setComponent, studentSubscription, setStudentSubscription, studentFile, setStudentFile }: props) {

  const handleCloseModal = () => {
    handleModalAction.setIsModalOpen(false);
  }

  return (
    <div className="h-screen w-screen  fixed inset-0 flex items-center justify-center z-20 "
      role="dialog"
      aria-labelledby="modal-title"
      aria-modal="true">
      <div className="fixed inset-0 bg-black/75 backdrop-blur-xs" />
      <div className='z-50 w-[20rem]  bg-[#FFCB00] rounded-lg overflow-hidden'>
        <div className="h-full w-full flex flex-col justify-center items-center">
          <div className="w-full flex justify-end ml-4" onClick={handleCloseModal}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-10 mr-4 mt-2 hover:fill-gray-400 hover:cursor-pointer ">
              <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm-1.72 6.97a.75.75 0 1 0-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 1 0 1.06 1.06L12 13.06l1.72 1.72a.75.75 0 1 0 1.06-1.06L13.06 12l1.72-1.72a.75.75 0 1 0-1.06-1.06L12 10.94l-1.72-1.72Z" clipRule="evenodd" />
            </svg>
          </div>
          {handleModalAction.modalComponent === "addAttendee" &&
            <ModalAddStudent />
          }
          {handleModalAction.modalComponent === "newSubscription" &&
            <ModalNewSubscription setStudentSubscription={setStudentSubscription}
                                  studentSubscription={studentSubscription}
                                  handleModalAction={handleModalAction} />
          }
          {handleModalAction.modalComponent === "signIn" &&
            <SignIn handleModalAction={handleModalAction} 
                    handleMsgModalAction={handleMsgModalAction}
            />
          }
          {handleModalAction.modalComponent === "userModal" &&
          <ModalUser handleModalAction={handleModalAction}
          setComponent={setComponent}/>
          }
          {handleModalAction.modalComponent === "studentFile" &&
          <ModalStudentFile studentFile={studentFile
}          setStudentFile={setStudentFile}
          handleModalAction={handleModalAction}
          handleMsgModalAction={handleMsgModalAction}
          />
          }
          {(handleModalAction.modalComponent === "updatePassword" || handleModalAction.modalComponent === "updateEmail" || handleModalAction.modalComponent === "updateApellido") &&
            <ModalUpdateLogInfo handleModalAction={handleModalAction} 
                    handleMsgModalAction={handleMsgModalAction}
            />
          }
        </div>
      </div>
    </div>
  )
}

export default Modal
