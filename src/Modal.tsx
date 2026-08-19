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
      <div className='xxxs:w-[15rem] xxxs:h-[20rem] xxxs:mt-[5rem] xxs:w-[20rem] xxs:h-[25rem] xxs:mt-[0rem] sm:w-[25rem] sm:h-[30rem] sm:mt-[5rem] 2xl:portrait:w-[35rem] 2xl:portrait:h-[30rem] 2xl:landscape:w-[40rem] 2xl:landscape:mt-[5rem] max-h-130 bg-[#FFCB00] rounded-lg z-50 overflow-hidden'>
        <div className="h-full flex flex-col justify-center items-center ">
          <div className="w-full flex justify-end ml-4" onClick={handleCloseModal}>
            <svg className="xxxs:size-11 xxxs:mr-3 xxxs:mt-3 xxs:size-12 xxs:mr-3 xxs:mt-2 sm:size-12 sm:mr-3 sm:mt-2 2xl:size-14 2xl:mr-5 2xl:mt-5   hover:fill-white hover:cursor-pointer "
             xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" >
              <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm-1.72 6.97a.75.75 0 1 0-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 1 0 1.06 1.06L12 13.06l1.72 1.72a.75.75 0 1 0 1.06-1.06L13.06 12l1.72-1.72a.75.75 0 1 0-1.06-1.06L12 10.94l-1.72-1.72Z" clipRule="evenodd" />
            </svg>
          </div>
          {handleModalAction.modalComponent === "addAttendee" &&
            <ModalAddStudent handleModalAction={handleModalAction}
              handleMsgModalAction={handleMsgModalAction} />
          }
          {handleModalAction.modalComponent === "newSubscription" &&
            <ModalNewSubscription handleModalAction={handleModalAction}
              handleMsgModalAction={handleMsgModalAction}
              setStudentSubscription={setStudentSubscription}
              studentSubscription={studentSubscription}
            />
          }
          {handleModalAction.modalComponent === "signIn" &&
            <SignIn handleModalAction={handleModalAction}
              handleMsgModalAction={handleMsgModalAction}
            />
          }
          {handleModalAction.modalComponent === "userModal" &&
            <ModalUser handleModalAction={handleModalAction}
              setComponent={setComponent} />
          }
          {handleModalAction.modalComponent === "studentFile" &&
            <ModalStudentFile studentFile={studentFile
            } setStudentFile={setStudentFile}
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
