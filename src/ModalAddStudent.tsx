import { useState } from "react";
import { useAppDispatch } from "./store/hooks";
import { NewRegistrantRequest, getStudentsRequest } from "./api/studentRequest";
import { getStudents } from "./store/reducers/students";
import type { handleModalAction, handleMsgModalAction } from "./types/Types";

interface props {
  handleModalAction: handleModalAction
  handleMsgModalAction: handleMsgModalAction
}

function ModalAddStudent({ handleModalAction, handleMsgModalAction }: props) {
  const [apellido, setApellido] = useState("");
  const [name, setName] = useState("");
  const [ageGroupe, setAgeGroupe] = useState("");
  const [subscription, setSubscription] = useState("");
  const [payed, setPayed] = useState("");
  const [amount2Pay, setAmount2Pay] = useState(0);
  let paymentStatus: boolean;

  const dispatch = useAppDispatch();

  const handleAdd = async () => {
    try {
      if (payed === "non") {
        paymentStatus = false
      } else if (payed === "oui") {
        paymentStatus = true
      }

      const newRData = { apellido, name, age_Group: ageGroupe, subscription, paymentStatus, amount2Pay }
      const response = await NewRegistrantRequest(newRData);
      console.log("newRData", newRData);

      console.log("responseXXX", response);
      if (!response.result) {
        handleMsgModalAction.setMsgModalContent({ result: response.result, message: response.message });
        handleMsgModalAction.setIsMsgModalOpen(true);
        return
      };

      const response2 = await getStudentsRequest()

      if (!response2.result) {
        handleMsgModalAction.setMsgModalContent({ result: response.result, message: response.message });
        handleMsgModalAction.setIsMsgModalOpen(true);
        return
      };

      console.log("response2", response2);
      dispatch(getStudents(response2.data));

      handleModalAction.setModalComponent("");
      handleModalAction.setIsModalOpen(false);

    } catch (error) {
      console.error("Error during adding new registrant:", error);
    }
  };


  console.log("ageGroupe", ageGroupe);
  return (
    <div className=" max-h-130 flex flex-col justify-evenly items-center my-2 overflow-y-auto ">
      <h3 className="text-3xl text-center text-white mb-1">
        Ajouter un nouvel inscrit
      </h3>
      <div className="w-full max-h-100 overflow-y-auto" >
        <fieldset className="flex flex-col justify-between items-center">
          <div className="flex flex-col">
            <input className="border-2 border-black bg-white rounded-md pl-2 py-1 my-2"
              id="apellido"
              type="text"
              placeholder="apellido (optionel)"
              value={apellido}
              onChange={(e) => setApellido(e.target.value)}
            />
          </div>
          <div className="flex flex-col">
            <input className="border-2 border-black bg-white rounded-md pl-2 py-1 my-2"
              id="name"
              type="text"
              placeholder="prénom nom"
              value={name}
              onChange={(e) => setName(e.target.value)}
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
                  onChange={(e) => setAgeGroupe(e.target.value)} />
                <span>Mineur</span>

              </div>

              <div>
                <input type="radio"
                  name="ageGroupe"
                  value="adult"
                  checked={ageGroupe === "adult"}
                  onChange={(e) => setAgeGroupe(e.target.value)} />
                <span>Adulte</span>
              </div>
            </div>
          </div>
          {ageGroupe === "underaged" &&
            <div className="flex flex-col">
              <div className="mt-2  text-lg font-semibold"
              >
                Type d'abonnement :
              </div>
              <div>
                <input type="radio"
                  name="subscription"
                  value="annuel"
                  checked={subscription === "annuel"}
                  onChange={(e) => setSubscription(e.target.value)} />
                Abonnement annuel
              </div>

            </div>
          }
          {ageGroupe === "adult" &&
            <div className="flex flex-col">
              <div className="mt-2  text-lg font-semibold"
              >
                Type d'abonnement :
              </div>
              <div>
                <input type="radio"
                  name="subscription"
                  value="trimestriel"
                  checked={subscription === "trimestriel"}
                  onChange={(e) => setSubscription(e.target.value)} />
                Abonnement Trimestriel
              </div>

              <div>
                <input type="radio"
                  name="subscription"
                  value="carte"
                  checked={subscription === "carte"}
                  onChange={(e) => setSubscription(e.target.value)} />
                Carte de 10
              </div>

            </div>
          }
          <div className="flex flex-col">
            {subscription &&
              <div className="flex flex-col my-2">
                <div className="flex flex-col justify-center">
                  <div className="mt-2 flex justify-center"
                  >
                    <span className="text-lg font-semibold ">Payé ?</span>

                  </div>
                  <div className="flex justify-evenly items-center">
                    <div className="mx-1">
                      <input type="radio"
                        name="payed?"
                        value="oui"
                        checked={payed === "oui"}
                        onChange={(e) => setPayed(e.target.value)} />
                      Oui
                    </div>

                    <div className="mx-1">
                      <input type="radio"
                        name="payed ? "
                        value="non"
                        checked={payed === "non"}
                        onChange={(e) => setPayed(e.target.value)} />
                      Non
                    </div>
                  </div>
                </div>

                {payed === "non" &&
                  <div className="mt-4 flex flex-col justify-center">
                    <span className="text-lg font-semibold text-center">Montant dû</span>
                    <input className="border-2 border-black bg-white rounded-md pl-2 py-1 my-2"
                      type="text"
                      placeholder="montant dû"
                      value={amount2Pay}
                      onChange={(e) => setAmount2Pay(parseFloat(e.target.value) || 0)}
                    />
                  </div>
                }
              </div>
            }

          </div>
          <button className="w-fit bg-black border-2 rounded-md px-2 py-1 mt-3 mb-6 border-black text-white hover:bg-white hover:text-black hover:cursor-pointer " onClick={handleAdd}>
            Ajouter
          </button>
        </fieldset>
      </div>
    </div>
  )
}

export default ModalAddStudent
