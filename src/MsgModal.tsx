import type { handleMsgModalAction } from "./types/Types"

interface props {
  handleMsgModalAction: handleMsgModalAction
}
function MsgModal({ handleMsgModalAction }: props) {


  const handleCloseModal = () => {
    handleMsgModalAction.setIsMsgModalOpen(false);
  }

  return (
    <div className="h-screen w-screen  fixed inset-0 flex items-center justify-center z-90 "
      role="dialog"
      aria-labelledby="modal-title"
      aria-modal="true">
      <div className="fixed inset-0 bg-black/75 backdrop-blur-xs" />
      <div className={!handleMsgModalAction.msgModalContent.result
        ? 'z-50 w-fit  bg-[#96031A] rounded-lg overflow-hidden '
        : 'z-50 w-fit  bg-[#039405] rounded-lg overflow-hidden '}>
        <div className="h-full w-full flex flex-col justify-center items-center">
          <div className="w-full flex justify-end ml-4 ">
            <svg xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="#e5e7eb"
              className="size-10 mr-4 mt-2 hover:fill-gray-400 hover:cursor-pointer "
              onClick={handleCloseModal}>
              <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm-1.72 6.97a.75.75 0 1 0-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 1 0 1.06 1.06L12 13.06l1.72 1.72a.75.75 0 1 0 1.06-1.06L13.06 12l1.72-1.72a.75.75 0 1 0-1.06-1.06L12 10.94l-1.72-1.72Z" clipRule="evenodd" />
            </svg>
          </div>
          <span className=" mx-8 my-4 text-gray-200">{handleMsgModalAction.msgModalContent.message}</span>
        </div>
      </div>
    </div>
  )
}

export default MsgModal
