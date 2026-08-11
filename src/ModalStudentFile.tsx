import { useState } from "react";
import { useAppSelector } from "./store/hooks";
import type { handleModalAction, handleMsgModalAction } from "./types/Types"

import { UpdateStudentFileRequest } from "./api/studentRequest";

interface props {
    handleModalAction: handleModalAction;
    handleMsgModalAction: handleMsgModalAction
    studentFile: any;
    setStudentFile: (value: any) => void;
}
function ModalStudentFile({ handleModalAction, handleMsgModalAction, studentFile, setStudentFile }: props) {
    const baseApellido = studentFile?.apellido || "";
    const baseName = studentFile?.name || "";
    const baseSubscriptionPlan = studentFile?.subscription?.plan || "aucune";
    const baseAmount2Pay = studentFile?.subscription?.amount2Pay || 0;
    const basePointsLeft = studentFile?.subscription?.pointsLeft || 0;
    const baseEndDate = studentFile?.subscription?.endDate || "";
    const [apellido, setApellido] = useState(baseApellido);
    const [name, setName] = useState(baseName);
    const [update, setUpdate] = useState(false)
    const [subscriptionPlan, setSubscriptionPlan] = useState(baseSubscriptionPlan);
    const [amount2Pay, setAmount2Pay] = useState(baseAmount2Pay);
    const [pointsLeft, setPointsLeft] = useState(basePointsLeft);
    const [endDate, setEndDate] = useState(baseEndDate);

    const auth = useAppSelector((state) => state.auth.value);

    const handleSave = async () => {
        try {
            const updateData = {
                admin: {
                    subscription: {
                        plan: subscriptionPlan,
                        amount2Pay: amount2Pay,
                        pointsLeft: pointsLeft,
                        endDate: endDate
                    }
                },
                student: {
                    apellido,
                    name,
                    subscription: {
                        plan: subscriptionPlan,
                        amount2Pay: amount2Pay,
                        pointsLeft: pointsLeft,
                        endDate: endDate
                    }
                }
            };

            const updateSFData = { studentID: studentFile._id, token: auth.token, updateData };
            const response = await UpdateStudentFileRequest(updateSFData);

            if (!response.result) {
                handleMsgModalAction.setMsgModalContent({ result: response.result, message: response.message });
                handleMsgModalAction.setIsMsgModalOpen(true);
                return;
            }
            setStudentFile("");
            setUpdate(false);
            handleModalAction.setIsModalOpen(false);
            handleModalAction.setModalComponent("");
        } catch (error) {
            console.error("Error updating student:", error);
        }
    }

    return (
        <div className="w-full h-full flex flex-col justify-evenly items-center my-2">
            <h3 className="text-3xl text-center text-white mb-1">
                Fiche {studentFile?.apellido}
            </h3>
            <div className="w-full px-6 flex justify-between items-center">
                <span className="text-md font-semibold">Apellido: </span>
                <input className="bg-yellow-100 rounded-md text-end pr-2 py-1 my-2 disabled:bg-[#FFCB00] disabled:text-gray-800"
                    type="text"
                    value={apellido}
                    onChange={(e) => setApellido(e.target.value)}
                    disabled={!update || studentFile.isAdmin}
                />
            </div>
            <div className="w-full px-6 flex justify-between items-center">
                <span className="text-md font-semibold">Nom: </span>
                <input className="bg-yellow-100 rounded-md text-end pr-2 py-1 my-2 disabled:bg-[#FFCB00] disabled:text-gray-800"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    disabled={!update || studentFile.isAdmin}
                />

            </div>
            {!update &&
                <div className="flex flex-col w-full px-6 mb-4">

                    <div className=" items-center flex justify-between my-2">
                        <span className="text-md font-semibold">Type d'abonnement: </span>

                        <span className="text-md pr-2">{studentFile.subscription?.plan}</span>
                    </div>
                    {studentFile.subscription?.plan === "trimestriel" &&
                        <div className=" items-center flex justify-between my-2">
                            <span className="text-md font-semibold">date de fin :</span>
                            <span className="text-md pr-2">{new Date(endDate)
                                .toLocaleDateString("fr-FR", { timeZone: "UTC" })
                                .replaceAll("/", "-")}</span>
                        </div>
                    }
                    {studentFile.subscription?.plan === "carte" &&
                        <div className=" items-center flex justify-between my-2">
                            <span className="text-md font-semibold">points restants :</span>
                            <span className="text-md pr-2">{studentFile.subscription?.pointsLeft}</span>
                        </div>
                    }
                    <div className=" items-center flex justify-between my-2">
                        <span className="text-md font-semibold">Restant à payer: </span>

                        <span className="text-md pr-2">{studentFile.subscription?.amount2Pay} €</span>
                    </div>
                </div>
            }
            {update &&
                <div id="subscription" className="flex flex-col items-center">
                    <span className="mt-2 text-lg font-semibold">Type d'abonnement :</span>
                    <div className="flex flex-col items-start">
                        <div>
                            <input type="radio"
                                name="subscription"
                                value="trimestriel"
                                checked={subscriptionPlan === "trimestriel"}
                                onChange={(e) => setSubscriptionPlan(e.target.value)}
                                disabled={!update}
                            />
                            Abonnement Trimestriel
                        </div>

                        <div>
                            <input type="radio"
                                name="subscription"
                                value="carte"
                                checked={subscriptionPlan === "carte"}
                                onChange={(e) => setSubscriptionPlan(e.target.value)}
                                disabled={!update}
                            />
                            Carte de 10
                        </div>
                    </div>
                    {(studentFile.subscription?.plan === "trimestriel") &&
                        <div className="w-full px-6 flex justify-between items-center">
                            <span className="mt-2 text-md font-semibold">Date de fin: </span>
                            <input className="w-1/2  bg-yellow-100 rounded-md text-end pr-2"
                                type="text"
                                name="endDate"
                                value={new Date(endDate).toLocaleDateString("fr-FR", { timeZone: "UTC" }).replaceAll("/", "-")}
                                onChange={(e) => {
                                    const value = e.target.value; // "01-10-2026"

                                    const [day, month, year] = value.split("-");

                                    setEndDate(
                                        new Date(Date.UTC(+year, +month - 1, +day)).toISOString()
                                    );
                                }}
                            />
                        </div>
                    }
                    {(studentFile.subscription?.plan === "carte" || studentFile.subscription?.pointsLeft > 0) &&
                        <div className="w-full px-6 flex justify-between items-center">
                            <span className="mt-2 text-md font-semibold">Points restants: </span>
                            <input className="w-1/6  bg-yellow-100 rounded-md text-end pr-2"
                                type="number"
                                name="pointsLeft"
                                value={pointsLeft}
                                onChange={(e) => setPointsLeft(e.target.value)}
                            />
                        </div>
                    }
                    <div className="w-full px-6 flex justify-between items-center mb-4">
                        <span className="mt-2 text-md font-semibold">Restes à Payer: </span>
                        <input className="w-1/3  bg-yellow-100 rounded-md text-end pr-2"
                            type="text"
                            name="amount2Pay"
                            value={amount2Pay}
                            onChange={(e) => setAmount2Pay(e.target.value)}
                        />
                    </div>

                </div>
            }
            {!update &&
                <button className="bg-gray-900 text-[#FFCB00] rounded-full py-1 px-2 ml-2 hover:bg-gray-800 hover:text-[#FFCB00] transition-colors duration-300 disabled:bg-[#FFCB00] disabled:text-gray-500 disabled:border-2 disabled:border-white "
                    onClick={() => setUpdate(true)}
                >modifier</button>
            }
            {update &&
                <div className="flex justify-center items-center">
                    <button className="bg-gray-900 text-[#FFCB00] rounded-full py-1 px-2 ml-2 hover:bg-gray-800 hover:text-[#FFCB00] transition-colors duration-300 disabled:bg-[#FFCB00] disabled:text-gray-500 disabled:border-2 disabled:border-white "
                        onClick={() => setUpdate(false)}
                    >Annuller</button>

                    <button className="bg-gray-900 text-[#FFCB00] rounded-full py-1 px-2 ml-2 hover:bg-gray-800 hover:text-[#FFCB00] transition-colors duration-300 disabled:bg-[#FFCB00] disabled:text-gray-500 disabled:border-2 disabled:border-white "
                        disabled={apellido === baseApellido && name === baseName && subscriptionPlan === baseSubscriptionPlan && amount2Pay === baseAmount2Pay && pointsLeft === basePointsLeft && endDate === baseEndDate}
                        onClick={handleSave}
                    >Sauvegarder</button>
                </div>
            }

        </div>
    )
}

export default ModalStudentFile
