import { useState } from "react";
import { useAppSelector, useAppDispatch } from "./store/hooks";
import { UpdateUserFileRequest } from "./utils/userAction";
import {askPassword, authRequest} from "./utils/authAction";
import { getUser } from "./store/reducers/user";

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
    const [apellido, setApellido] = useState(baseApellido);
    const [name, setName] = useState(baseName);
    const [subscriptionPlan, setSubscriptionPlan] = useState(baseSubscriptionPlan || null);
    const [amount2Pay, setAmount2Pay] = useState(baseAmount2Pay);
    const [pointsLeft, setPointsLeft] = useState(basePointsLeft);
    const [endDate, setEndDate] = useState(baseEndDate);
    const dispatch = useAppDispatch();

    console.log("User", user, "yeah");

    const handleSave = async () => {
        try {
            if (!auth.token) return

            handleAuthModalAction.setIsAuthModalOpen(true);
            const password = await askPassword();
            console.log("password", password);
            const aRequestData = { token: auth.token, password };
            console.log("aRequestData", aRequestData);
            const authResponse = await authRequest(aRequestData)
            console.log("await authResponse", authResponse);

            if(!authResponse.result) {
                console.log("authResponse", authResponse);
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

            console.log("updateSFData", updateUFData);
            const response = await UpdateUserFileRequest(updateUFData);
            console.log("responseMSF", response);
            if (!response.result) {
                handleMsgModalAction.setMsgModalContent(response.message);
                handleMsgModalAction.setIsMsgModalOpen(true);
                return;
            }
            dispatch(getUser(response.data));
            setUpdate(false);

        } catch (error) {
            console.error("Error updating student:", error);
        }
    }

    return (
        <div className="w-1/2 flex flex-col items-center justify-center ">
            <div className="w-4/7 flex flex-col  justify-center gap-2 mt-4 ">

                <div className=" flex justify-between items-center px-6">
                    <span className="text-md font-semibold ">Nom: </span>
                    <input className="bg-yellow-100 rounded-md text-end pr-2 py-1 my-2 disabled:bg-[#FFCB00] disabled:text-gray-800"
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        disabled={!update}
                    />

                </div>
                {!update &&
                    <div className=" flex flex-col mb-4 px-6">

                        <div className="  flex justify-between  my-2">
                            <span className="w-full text-md font-semibold whitespace-nowrap ">Type d'abonnement: </span>

                            <span className="text-md pr-2 whitespace-nowrap">{user.subscription?.plan}</span>
                        </div>
                        {user.subscription?.plan === "trimestriel" &&
                            <div className=" items-center flex justify-between my-2">
                                <span className="text-md font-semibold whitespace-nowrap">date de fin :</span>
                                <span className="text-md pr-2 whitespace-nowrap">{new Date(endDate)
                                    .toLocaleDateString("fr-FR", { timeZone: "UTC" })
                                    .replaceAll("/", "-")}</span>
                            </div>
                        }
                        {user.subscription?.plan === "carte" &&
                            <div className="w-2/6 items-center flex justify-between my-2">
                                <span className="text-md font-semibold whitespace-nowrap">points restants :</span>
                                <span className="text-md pr-2 whitespace-nowrap">{user.subscription?.pointsLeft}</span>
                            </div>
                        }
                        <div className=" items-center flex justify-between my-2">
                            <span className="text-md font-semibold whitespace-nowrap">Restant à payer: </span>

                            <span className="text-md pr-2 whitespace-nowrap">{user.subscription?.amount2Pay} €</span>
                        </div>
                    </div>
                }

                {update &&
                    <div id="subscription" className="w-full flex flex-col justify-center items-center">
                        <span className="mt-2 text-lg font-semibold">Type d'abonnement :</span>
                        <div className="w-full flex justify-between items-center mb-4">
                            <div className="w-full flex flex-row justify-between ">
                                <div className="w-full pl-6 ">
                                    <input type="radio"
                                        name="subscription"
                                        value="trimestriel"
                                        checked={subscriptionPlan === "trimestriel"}
                                        onChange={(e) => setSubscriptionPlan(e.target.value)}
                                        disabled={!update}
                                    />
                                    Trimestriel
                                </div>

                                <div className="w-full text-end pr-6">
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
                        {(user.subscription?.plan === "carte" || user.subscription?.pointsLeft > 0) &&
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
                                onChange={(e) => setAmount2Pay(Number(e.target.value))}
                            />
                        </div>

                    </div>
                }
                {!update &&
                    <div className="flex justify-center items-center">
                        <button className="w-1/2 bg-gray-900 text-[#FFCB00] rounded-full py-1 hover:bg-gray-800 hover:text-[#FFCB00] transition-colors duration-300 disabled:bg-[#FFCB00] disabled:text-gray-500 disabled:border-2 disabled:border-white "
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