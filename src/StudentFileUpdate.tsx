import { useState } from "react";
import { useAppSelector, useAppDispatch } from "./store/hooks";
import type { handleModalAction, handleMsgModalAction } from "./types/Types"

import { loadStudents } from "./utils/studentAction";
import { UpdateStudentFileRequest } from "./api/studentRequest";

interface props {
    handleModalAction: handleModalAction;
    handleMsgModalAction: handleMsgModalAction
    studentFile: any;
    setStudentFile: (value: any) => void;
    update: boolean;
    setUpdate: (value: boolean) => void
}
function ModalStudentFile({ handleModalAction, handleMsgModalAction, studentFile, setStudentFile, update, setUpdate }: props) {

    const apellido = studentFile?.apellido || "";
    const [name, setName] = useState(studentFile?.name || "");
    const [ageGroupe, setAgeGroupe] = useState(studentFile?.age_Group || "");
    const [subscriptionPlan, setSubscriptionPlan] = useState(studentFile?.subscription?.plan || "aucune");
    const [amount2Pay, setAmount2Pay] = useState(studentFile?.subscription?.amount2Pay || 0);
    const [pointsLeft, setPointsLeft] = useState<number>(Number(studentFile?.subscription?.pointsLeft || 0)); 
    const [endDate, setEndDate] = useState(studentFile?.subscription?.endDate || "");

    const dispatch = useAppDispatch();
    const auth = useAppSelector((state) => state.auth.value);
    const handleSave = async () => {
        try {
            const role = studentFile.isAdmin
            const updateData = role === "admin"
    ? {
        admin: {
            subscription: {
                plan: subscriptionPlan,
                amount2Pay: Number(amount2Pay),
                pointsLeft,
                endDate,
            },
        },
    }
    : {
        student: {
            apellido,
            name,
            subscription: {
                plan: subscriptionPlan,
                amount2Pay: Number(amount2Pay),
                pointsLeft,
                endDate,
            },
        },
    };

            const updateSFData = { studentID: studentFile._id, token: auth.token, updateData };
            const response = await UpdateStudentFileRequest(updateSFData);
            if (!response.result) {
                handleMsgModalAction.setMsgModalContent({ result: response.result, message: response.message });
                handleMsgModalAction.setIsMsgModalOpen(true);
                return;
            }
            setStudentFile("");

            handleMsgModalAction.setMsgModalContent({ result: response.result, message: response.message });
            handleMsgModalAction.setIsMsgModalOpen(true);
            const loadStudentsData = { dispatch };
            loadStudents(loadStudentsData)
            setUpdate(false);
            handleModalAction.setIsModalOpen(false);
            handleModalAction.setModalComponent("");
        } catch (error) {
            console.error("Error updating student:", error);
        }
    }

    return (
        <div className="w-full h-full flex flex-col justify-evenly items-center my-2">

            <div className="w-full px-6 flex justify-between items-center">
                <span className="text-md font-semibold">Nom: </span>
                <input className="bg-yellow-100 rounded-md text-end pr-2 py-1 my-2 disabled:bg-[#FFCB00] disabled:text-gray-800"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    disabled={!update || studentFile.isAdmin}
                />

            </div>
            <div className="flex flex-col">
                <span className="mt-2  text-lg font-semibold"
                >
                    Catégorie d'age :
                </span>
                <div className="flex justify-between">
                    <div>
                        <input type="radio"
                            name="ageGroupe"
                            value="underaged"
                            checked={ageGroupe === "underaged"}
                            onChange={(e) => setAgeGroupe(e.target.value)}
                            disabled={subscriptionPlan === "trimestriel" || subscriptionPlan === "carte"} />
                        <span>Mineur</span>

                    </div>

                    <div>
                        <input type="radio"
                            name="ageGroupe"
                            value="adult"
                            checked={ageGroupe === "adult"}
                            onChange={(e) => setAgeGroupe(e.target.value)}
                            disabled={studentFile.subscription?.plan === "annuel"} />
                        <span>Adulte</span>
                    </div>
                </div>
            </div>

            {subscriptionPlan &&
                <button className="bg-gray-900 text-[#FFCB00] text-xs mt-3 rounded-full py-1 px-2 ml-2 hover:bg-gray-800 hover:text-[#FFCB00] transition-colors duration-300 disabled:bg-[#FFCB00] disabled:text-gray-500 disabled:border-2 disabled:border-white "
                    onClick={() => setSubscriptionPlan("none")}
                >Annuller l'Abonnement</button>}
            {ageGroupe === "adult" &&
                <div id="subscription" className="flex flex-col items-center">
                    <span className=" text-lg font-semibold">Type d'abonnement :</span>
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
                    {(subscriptionPlan === "trimestriel") &&
                        <div className="w-full px-6 flex justify-between items-center">
                            <span className="mt-2 text-md font-semibold">Date de fin: </span>
                            <input className="w-1/2  bg-yellow-100 rounded-md text-end pr-2"
                                type="text"
                                name="endDate"
                                value={new Date(endDate).toLocaleDateString("fr-FR", { timeZone: "UTC" }).replaceAll("/", "-")}
                                onChange={(e) => {
                                    const value = e.target.value; // "01-10-2026"

                                    const [day, month, year] = value.split("-");

                                    setEndDate(new Date(Date.UTC(+year, +month - 1, +day)).toISOString());
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
                                onChange={(e) => setPointsLeft(Number(e.target.value))}
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
            {ageGroupe === "underaged" &&
                <div id="subscription" className="flex flex-col items-center">
                    <span className=" text-lg font-semibold">Type d'abonnement :</span>
                    <div className="flex flex-col items-start">
                        <div>
                            <input type="radio"
                                name="subscription"
                                value="annuel"
                                checked={subscriptionPlan === "annuel"}
                                onChange={(e) => setSubscriptionPlan(e.target.value)}
                                disabled={!update}
                            />
                            Abonnement Annuel
                        </div>

                    </div>
                    {(subscriptionPlan === "annuel") &&
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

            <div className="flex justify-center items-center">
                <button className="bg-gray-900 text-[#FFCB00] rounded-full py-1 px-2 ml-2 hover:bg-gray-800 hover:text-[#FFCB00] transition-colors duration-300 disabled:bg-[#FFCB00] disabled:text-gray-500 disabled:border-2 disabled:border-white "
                    onClick={() => { setUpdate(false) }}
                >Annuller</button>

                <button className="bg-gray-900 text-[#FFCB00] rounded-full py-1 px-2 ml-2 hover:bg-gray-800 hover:text-[#FFCB00] transition-colors duration-300 disabled:bg-[#FFCB00] disabled:text-gray-500 disabled:border-2 disabled:border-white "
                    disabled={(apellido === studentFile?.apellido && name === studentFile?.name && subscriptionPlan === studentFile?.subscription?.plan && amount2Pay === studentFile?.subscription?.amount2Pay && pointsLeft === studentFile?.subscription?.pointsLeft && endDate === studentFile?.subscription?.endDate) || subscriptionPlan === "none"}
                    onClick={handleSave}
                >Sauvegarder</button>
            </div>

        </div>
    )
}

export default ModalStudentFile
