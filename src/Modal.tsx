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

  console.log({
  innerWidth: window.innerWidth,
  innerHeight: window.innerHeight,
  outerWidth: window.outerWidth,
  outerHeight: window.outerHeight,
});

  return (
    <div className="h-screen w-screen  fixed inset-0 flex items-center justify-center z-20 "
      role="dialog"
      aria-labelledby="modal-title"
      aria-modal="true">
      <div className="fixed inset-0 bg-black/75 backdrop-blur-xs" />
      <div className='
      portrait:xxxs:w-[15rem] portrait:xxxs:h-[20rem] portrait:xxxs:mt-[1rem] 
      portrait:xxs:w-[20rem] portrait:xxs:h-[25rem] portrait:xxs:mt-[0rem]
      portrait:sm:w-[25rem] portrait:sm:h-[30rem] portrait:sm:mt-[5rem]
      portrait:2xl:portrait:w-[35rem] portrait:2xl:h-[30rem]  
      landscape:xs:w-[25rem] landscape:xs:h-[16rem] landscape:xs:mt-[1rem] 
      landscape:sm:w-[30rem] landscape:sm:h-[17rem] landscape:sm:mt-[2rem] landscape:md:w-[30rem] landscape:md:h-[22rem] landscape:md:mt-[0rem]
      landscape:lg:w-[30rem] landscape:lg:h-[30rem] landscape:lg:mt-[0rem] 
      max-h-130 bg-[#FFCB00] rounded-lg z-50 overflow-hidden'>
        <div className="h-full flex flex-col justify-center items-center ">
          <div className="w-full flex justify-end ml-4" onClick={handleCloseModal}>
            <svg className="xxxs:portrait:size-11 xxxs:portrait:mr-3 xxxs:portrait:mt-3 xxxs:landscape:size-10 xxxs:landscape:mr-3 xxxs:landscape:mt-2 xxs:size-12 xxs:mr-3 xxs:mt-2 sm:size-12 sm:mr-3 sm:mt-2 2xl:size-14 2xl:mr-5 2xl:mt-5   hover:fill-white hover:cursor-pointer "
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
