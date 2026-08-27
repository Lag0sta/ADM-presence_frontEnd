import { useState, useEffect } from "react";
import { useAppSelector, useAppDispatch } from "./store/hooks";
import { UpdateUserFileRequest } from "./api/userRequest";
import { authRequest } from "./api/authRequest";
import { askAuth } from "./utils/authAction"
import { loadUser } from "./utils/userAction"

import type { handleMsgModalAction, handleAuthModalAction } from "./types/Types";

interface props {
    handleMsgModalAction: handleMsgModalAction
    handleAuthModalAction: handleAuthModalAction
    update: boolean;
    setUpdate: (value: boolean) => void;
}

function UserFile({ handleMsgModalAction, handleAuthModalAction, setUpdate, update, }: props) {
    const auth = useAppSelector((state) => state.auth.value);
    const user = useAppSelector((state) => state.user.value);

    const baseApellido = user?.apellido || "";
    const baseName = user?.name || "";
    const baseSubscriptionPlan = user?.subscription?.plan || null;
    const baseAmount2Pay = user?.subscription?.amount2Pay || 0;
    const basePointsLeft = user?.subscription?.pointsLeft || 0;
    const baseEndDate = user?.subscription?.endDate || "";
    const [name, setName] = useState(baseName);
    const [subscriptionPlan, setSubscriptionPlan] = useState(baseSubscriptionPlan || null);
    const [amount2Pay, setAmount2Pay] = useState(baseAmount2Pay);
    const [pointsLeft, setPointsLeft] = useState(basePointsLeft);
    const [endDate, setEndDate] = useState(baseEndDate);
    const apellido = useAppSelector((state) => state.auth.value.apellido);

    const dispatch = useAppDispatch();

    useEffect(() => {
        setName(user?.name || "");
        setSubscriptionPlan(user?.subscription?.plan || null);
        setAmount2Pay(user?.subscription?.amount2Pay || 0);
        setPointsLeft(user?.subscription?.pointsLeft || 0);
        setEndDate(user?.subscription?.endDate || "");
    }, [user]);

    const handleSave = async () => {
        try {
            if (!auth.token) return

            handleAuthModalAction.setIsAuthModalOpen(true);

            const { email, password } = await askAuth();

            if (!email || !password) return console.log("No email or password");

            const aRequestData = { token: auth.token, password, email };

            const authResponse = await authRequest(aRequestData)

            if (!authResponse.result) {
                handleMsgModalAction.setMsgModalContent(authResponse.message);
                handleMsgModalAction.setIsMsgModalOpen(true);
                return;
            }

            handleAuthModalAction.setIsAuthModalOpen(false);

            const updateData = {
                apellido,
                name,
                subscription: {
                    plan: subscriptionPlan,
                    amount2Pay: amount2Pay,
                    pointsLeft: pointsLeft,
                    endDate: endDate
                }
            }

            const updateUFData = { token: auth.token, updateData };

            const response = await UpdateUserFileRequest(updateUFData);

            if (!response.result) {
                handleMsgModalAction.setMsgModalContent(response.message);
                handleMsgModalAction.setIsMsgModalOpen(true);
                return;
            }

            handleMsgModalAction.setMsgModalContent({ result: response.result, message: response.message });
            handleMsgModalAction.setIsMsgModalOpen(true);

            const loadUserData = { apellido: response.data.apellido, token: auth.token, dispatch }

            loadUser(loadUserData);

            setUpdate(false);

        } catch (error) {
            console.error("Error updating student:", error);
        }
    }

    return (
        <div className=" flex flex-col items-center justify-center">
            <div className=" flex flex-col  justify-center gap-2 mt-4 ">
                <div className="bg-green-500 landscape:xs:w-[12rem] flex justify-between items-center ">
                    <span className="text-md font-semibold ">Nom: </span>
                    <span>{name}</span>
                </div>
                <div className="bg-green-500 landscape:xs:w-[12rem] flex justify-between items-center ">
                    <span className="text-md font-semibold ">Nom: </span>
                    <input className="w-[1rem] bg-yellow-100 rounded-md text-end pr-2 py-1 my-2 disabled:bg-[#FFCB00] disabled:text-gray-800"
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        disabled={!update}
                    />

                </div>
                

                {update &&
                    <div id="subscription" className=" flex flex-col justify-center items-center">
                        <span className="mt-2 text-lg font-semibold">Plan:</span>
                        <div className=" flex justify-between items-center mb-4">
                            <div className="flex flex-row justify-between ">
                                <div className=" pl-6 ">
                                    <input type="radio"
                                        name="subscription"
                                        value="trimestriel"
                                        checked={subscriptionPlan === "trimestriel"}
                                        onChange={(e) => setSubscriptionPlan(e.target.value)}
                                        disabled={!update}
                                    />
                                    Trimestriel
                                </div>

                                <div className=" text-end pr-6">
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
                        </div>
                        {(user.subscription?.plan === "trimestriel") &&
                            <div className=" px-6 flex justify-between items-center">
                                <span className="mt-2 text-md font-semibold">Date de fin: </span>
                                <input className="  bg-yellow-100 rounded-md text-end pr-2"
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
                        {(user.subscription?.plan === "carte" || user.subscription?.pointsLeft > 0) &&
                            <div className=" px-6 flex justify-between items-center">
                                <span className="mt-2 text-md font-semibold">Points restants: </span>
                                <input className="  bg-yellow-100 rounded-md text-end pr-2"
                                    type="number"
                                    name="pointsLeft"
                                    value={pointsLeft}
                                    onChange={(e) => setPointsLeft(Number(e.target.value))}
                                />
                            </div>
                        }
                        <div className=" px-6 flex justify-between items-center mb-4">
                            <span className="mt-2 text-md font-semibold">Restes à Payer: </span>
                            <input className=" bg-yellow-100 rounded-md text-end pr-2"
                                type="text"
                                name="amount2Pay"
                                value={amount2Pay}
                                onChange={(e) => setAmount2Pay(Number(e.target.value))}
                            />
                        </div>

                    </div>
                }
                {!update &&
                    <div className="flex justify-center items-center">
                        <button className=" bg-gray-900 text-[#FFCB00] rounded-full py-1 hover:bg-gray-800 hover:text-[#FFCB00] transition-colors duration-300 disabled:bg-[#FFCB00] disabled:text-gray-500 disabled:border-2 disabled:border-white "
                            onClick={() => setUpdate(true)}
                        >modifier</button>
                    </div>
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
        </div>

    )
}

export default UserFile