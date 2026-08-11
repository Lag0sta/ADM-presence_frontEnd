import { useState, useEffect } from "react"
import { useAppSelector, useAppDispatch } from "./store/hooks";
import { authRequest } from "./utils/authAction"
import { UpdateUserInfoRequest } from "./utils/userAction"
import { updateAuthApellido } from "./store/reducers/auth"
import type { handleModalAction, handleMsgModalAction } from "./types/Types"

interface props {
    handleModalAction: handleModalAction
    handleMsgModalAction: handleMsgModalAction
}
function ModalUpdateLogInfo({ handleModalAction, handleMsgModalAction }: props) {
    const [password, setPassword] = useState("")
    const [newPassword, setNewPassword] = useState("")
    const [confirmNewPassword, setConfirmNewPassword] = useState("")
    const [email, setEmail] = useState("")
    const [newEmail, setNewEmail] = useState("")
    const [confirmNewEmail, setConfirmNewEmail] = useState("")
    const [apellido, setApellido] = useState("")
    const [condition, setCondition] = useState(false)
    const auth = useAppSelector((state) => state.auth.value);
    const dispatch = useAppDispatch();


    useEffect(() => {
        if (handleModalAction.modalComponent === "updateApellido") return setCondition(!password || !email || !apellido);

        if (handleModalAction.modalComponent === "updatePassword") return setCondition(!password || !newPassword || !confirmNewPassword || !email || (newPassword !== confirmNewPassword));

        if (handleModalAction.modalComponent === "updateEmail") return setCondition(!password || !email || !newEmail || !confirmNewEmail || (newEmail !== confirmNewEmail));

    }, [password, newPassword, confirmNewPassword, email, newEmail, confirmNewEmail, apellido])

    const handleSubmit = async () => {
        try {
            const aRequestData = { token: auth.token, password, email };

            const authResponse = await authRequest(aRequestData)

            if (!authResponse.result) {
                console.log("authResponse", authResponse);
                handleMsgModalAction.setMsgModalContent(authResponse.message);
                handleMsgModalAction.setIsMsgModalOpen(true);
                return;
            }

            if (handleModalAction.modalComponent === "updateApellido") {
                const updateUIData = { token: auth.token, apellido, password, email };

                const response = await UpdateUserInfoRequest(updateUIData);

                if (!response.result) {
                    handleMsgModalAction.setMsgModalContent({result: response.result, message: response.message});
                    handleMsgModalAction.setIsMsgModalOpen(true);
                    return;
                }
                handleMsgModalAction.setMsgModalContent({result: response.result, message: "apellido modifié"});
                handleMsgModalAction.setIsMsgModalOpen(true);
                dispatch(updateAuthApellido(response.user.apellido))
            }

            if (handleModalAction.modalComponent === "updateEmail") {
                const updateUIData = { token: auth.token, apellido, password, email };

                const response = await UpdateUserInfoRequest(updateUIData);

                if (!response.result) {
                    handleMsgModalAction.setMsgModalContent({result: response.result, message: response.message});
                    handleMsgModalAction.setIsMsgModalOpen(true);
                    return;
                }
                handleMsgModalAction.setMsgModalContent({result: response.result, message: "email modifié"});
                handleMsgModalAction.setIsMsgModalOpen(true);
            }

            if (handleModalAction.modalComponent === "updatePassword") {
                const updateUIData = { token: auth.token, apellido, password, email };

                const response = await UpdateUserInfoRequest(updateUIData);

                if (!response.result) {
                    handleMsgModalAction.setMsgModalContent({result: response.result, message: response.message});
                    handleMsgModalAction.setIsMsgModalOpen(true);
                    return;
                }
                handleMsgModalAction.setMsgModalContent({result: response.result, message: "mot de passe modifié"});
                handleMsgModalAction.setIsMsgModalOpen(true);
            }
            setApellido("");
            setPassword("");
            setNewPassword("");
            setConfirmNewPassword("");
            setEmail("");
            setNewEmail("");
            setConfirmNewEmail("");
            handleModalAction.setModalComponent("");
            handleModalAction.setIsModalOpen(false);

        } catch (error) {
            return error
        }
    }

    const handleCloseModal = () => {
        setApellido("");
        setPassword("");
        setNewPassword("");
        setConfirmNewPassword("");
        setEmail("");
        setNewEmail("");
        setConfirmNewEmail("");
        handleModalAction.setModalComponent("");
        handleModalAction.setIsModalOpen(false);
    }

    return (
        <div className="h-screen w-screen  fixed inset-0 flex items-center justify-center z-20 "
            role="dialog"
            aria-labelledby="modal-title"
            aria-modal="true">
            <div className="fixed inset-0 bg-black/75 backdrop-blur-xs" />
            <div className='z-50 w-fit  bg-[#FFCB00] rounded-lg overflow-hidden '>
                <div className="h-full w-full flex flex-col justify-center items-center">
                    <div className="w-full flex justify-end ml-4 " onClick={handleCloseModal}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#000" className="size-10 mr-4 mt-2 hover:fill-gray-400 hover:cursor-pointer ">
                            <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm-1.72 6.97a.75.75 0 1 0-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 1 0 1.06 1.06L12 13.06l1.72 1.72a.75.75 0 1 0 1.06-1.06L13.06 12l1.72-1.72a.75.75 0 1 0-1.06-1.06L12 10.94l-1.72-1.72Z" clipRule="evenodd" />
                        </svg>
                    </div>
                    {handleModalAction.modalComponent === "updateApellido" &&
                        <h4 className="mb-4 text-white text-bold text-2xl">Apellido</h4>
                    }
                    {handleModalAction.modalComponent === "updateEmail" &&
                        <h4 className="text-white text-bold text-2xl">Email</h4>
                    }
                    {handleModalAction.modalComponent === "updatePassword" &&
                        <h4 className="text-white text-bold text-2xl">Mot de Passe</h4>
                    }
                    {handleModalAction.modalComponent === "updateApellido" &&
                        <div className="w-full flex flex-col justify-center items-center">
                            <div className="w-full mb-4 flex flex-col justify-center items-center">
                                <span>Nouveau Apellido :</span>
                                <input className="mx-8 mb-1 border border-2 border-gray-100 rounded-md p-2"
                                    type="text"
                                    placeholder="Nouveau Apellido"
                                    value={apellido}
                                    onChange={(e) => setApellido(e.target.value)} />
                            </div>
                            <div className="w-full mb-4 flex flex-col justify-center items-center">
                                <span>Confirmez votre identité</span>
                                <input className="mx-8 mb-1 border border-2 border-gray-100 rounded-md p-2"
                                    type="email"
                                    placeholder="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)} />

                                <input className="mx-8 mb-1 border border-2 border-gray-100 rounded-md p-2"
                                    type="password"
                                    placeholder="mot de passe"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)} />
                            </div>

                        </div>
                    }
                    {handleModalAction.modalComponent === "updateEmail" &&
                        <div className="w-full flex flex-col justify-center items-center">
                            <div className="w-full mb-4 flex flex-col justify-center items-center">
                                <span>Nouveau Email :</span>
                                <input className="mx-8 mb-1 border border-2 border-gray-100 rounded-md p-2"
                                    type="text"
                                    placeholder="Nouveau e-mail"
                                    value={newEmail}
                                    onChange={(e) => setNewEmail(e.target.value)} />
                                <input className={
                                    confirmNewEmail &&
                                        newEmail !== confirmNewEmail
                                        ? "mx-8 mb-1 border border-2 border-red-500 rounded-md p-2"
                                        : "mx-8 mb-1 border border-2 border-gray-100 rounded-md p-2"}
                                    type="text"
                                    placeholder="Confirmez l'e-mail"
                                    value={confirmNewEmail}
                                    onChange={(e) => setConfirmNewEmail(e.target.value)} />
                                {(confirmNewEmail && (newEmail !== confirmNewEmail)) && (
                                    <span className="text-red-500 text-xs">
                                        Les emails ne correspondent pas.
                                    </span>
                                )}
                            </div>
                            <div className="w-full mb-4 flex flex-col justify-center items-center">
                                <span>Confirmez votre identité</span>
                                <input className="mx-8 mb-1 border border-2 border-gray-100 rounded-md p-2"
                                    type="email"
                                    placeholder="ancien email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)} />

                                <input className="mx-8 mb-1 border border-2 border-gray-100 rounded-md p-2"
                                    type="password"
                                    placeholder="mot de passe"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)} />
                            </div>

                        </div>
                    }
                    {handleModalAction.modalComponent === "updatePassword" &&
                        <div className="w-full flex flex-col justify-center items-center">
                            <div className="w-full mb-4 flex flex-col justify-center items-center">
                                <span>Nouveau Mot de Passe :</span>
                                <input className="mx-8 mb-1 border border-2 border-gray-100 rounded-md p-2"
                                    type="text"
                                    placeholder="Nouveau mdp"
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)} />
                                <input className={
                                    confirmNewPassword &&
                                        newPassword !== confirmNewPassword
                                        ? "mx-8 mb-1 border border-2 border-red-500 rounded-md p-2"
                                        : "mx-8 mb-1 border border-2 border-gray-100 rounded-md p-2"}
                                    type="text"
                                    placeholder="Confirmez nouveau mdp"
                                    value={confirmNewPassword}
                                    onChange={(e) => setConfirmNewPassword(e.target.value)} />
                                {(confirmNewPassword && (newPassword !== confirmNewPassword)) && (
                                    <span className="text-red-500 text-xs">
                                        Les mots de passes ne correspondent pas.
                                    </span>
                                )}
                            </div>
                            <div className="w-full mb-4 flex flex-col justify-center items-center">
                                <span>Confirmez votre identité</span>
                                <input className="mx-8 mb-1 border border-2 border-gray-100 rounded-md p-2"
                                    type="email"
                                    placeholder="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)} />

                                <input className="mx-8 mb-1 border border-2 border-gray-100 rounded-md p-2"
                                    type="password"
                                    placeholder="ancien mot de passe"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)} />
                            </div>

                        </div>
                    }
                    <button className="cursor-pointer mx-8 my-4 bg-black text-gray-100 px-4 py-1 rounded-lg disabled:bg-[#FFCB00] disabled:text-yellow-300 disabled:border-yellow-300 disabled:border-2"
                        onClick={handleSubmit}
                        disabled={condition}>Valider</button>
                </div>
            </div>
        </div>
    )
}

export default ModalUpdateLogInfo
