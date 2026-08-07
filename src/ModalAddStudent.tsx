import { useState } from "react";
import { useAppDispatch } from "./store/hooks";
import { NewRegistrantRequest, getStudentsRequest } from "./utils/studentAction";
import { getStudents } from "./store/reducers/students";

function ModalAddStudent() {
  const [apellido, setApellido] = useState("");
  const [name, setName] = useState("");
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

      const newRData = { apellido, name, subscription, paymentStatus, amount2Pay }
      const response = await NewRegistrantRequest(newRData);

      if (!response) return;

      const response2 = await getStudentsRequest()

      dispatch(getStudents(response2.data));

    }catch (error) {
      console.error("Error during adding new registrant:", error);
    }
  };

  console.log("subscription", subscription)
  return (
    <div className="w-full h-full flex flex-col justify-evenly items-center my-2">
      <h3 className="text-3xl text-center text-white mb-1">
        Ajouter un nouvel inscrit
      </h3>
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
          {subscription &&
            <div className="flex flex-col my-2">
              <div className="flex flex-col">
                <div className="text-lg font-semibold mt-2 "
                >
                  Payé ?
                </div>
                <div className="w-fit">
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
                <input className="border-2 border-black bg-white rounded-md pl-2 py-1 my-2"
                  type="text"
                  placeholder="montant dû"
                  value={amount2Pay}
                  onChange={(e) => setAmount2Pay(parseFloat(e.target.value) || 0)}
                />
              }
            </div>
          }

        </div>
        <button className="w-fit bg-black border-2 rounded-md px-2 py-1 mt-3 mb-6 border-black text-white hover:bg-white hover:text-black hover:cursor-pointer " onClick={handleAdd}>
          Ajouter
        </button>
      </fieldset>

    </div>
  )
}

export default ModalAddStudent
