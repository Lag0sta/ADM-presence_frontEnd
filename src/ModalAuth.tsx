import { useState } from "react"
import { submitPassword } from "./utils/authAction"
import type {handleAuthModalAction } from "./types/Types"

interface props {
    handleAuthModalAction: handleAuthModalAction
}
function ModalAuth({ handleAuthModalAction }: props) {
    const [password, setPassword] = useState("")
    const handleSubmit = () => {
        submitPassword(password)
        setPassword("");

    }
    const handleCloseModal = () => {
        setPassword("");
        handleAuthModalAction.setIsAuthModalOpen(false);
    }

    return (
        <div className="h-screen w-screen  fixed inset-0 flex items-center justify-center z-20 "
            role="dialog"
            aria-labelledby="modal-title"
            aria-modal="true">
            <div className="fixed inset-0 bg-black/75 backdrop-blur-xs" />
            <div className='z-50 w-75  bg-[#FFCB00] rounded-lg overflow-hidden '>
                <div className="h-full w-full flex flex-col justify-center items-center">
                    <div className="w-full flex justify-end ml-4 " onClick={handleCloseModal}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#000" className="size-10 mr-4 mt-2 hover:fill-gray-400 hover:cursor-pointer ">
                            <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm-1.72 6.97a.75.75 0 1 0-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 1 0 1.06 1.06L12 13.06l1.72 1.72a.75.75 0 1 0 1.06-1.06L13.06 12l1.72-1.72a.75.75 0 1 0-1.06-1.06L12 10.94l-1.72-1.72Z" clipRule="evenodd" />
                        </svg>
                    </div>
                    <h4 className = "text-white text-bold text-2xl">Authentification</h4>
                    <input className="mx-8 my-4 border border-2 border-gray-100 rounded-md p-2"
                        type="password"
                        placeholder="mot de passe"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)} />
                    <span className="cursor-pointer mx-8 my-4 bg-black text-gray-100 px-4 py-1 rounded-lg" onClick={handleSubmit}>Valider</span>
                </div>
            </div>
        </div>
    )
}

export default ModalAuth
