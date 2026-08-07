import { useEffect } from "react";
import { useAppSelector, useAppDispatch } from "./store/hooks";
import { getUserRequest } from "./utils/userAction";
import { getUser } from "./store/reducers/user";

function UserPage() {
    const auth = useAppSelector((state) => state.auth.value);
    const user = useAppSelector((state) => state.user.value);
    const dispatch = useAppDispatch();

    console.log("User", user, "yeah");

   useEffect(() => {
           if (!auth.token) return
           const userPage = async () => {
             try {
               const getURData = { apellido: auth.apellido, token: auth.token };
               console.log("getURData:", getURData);
               const students = await getUserRequest(getURData);

               if(!students.result) {
                console.error("Error fetching user:", students.message);
                return;
               }
               console.log("Students fetched:", students);
                dispatch(getUser(students.data));
       
             } catch (error) {
               console.error("Error fetching students:", error);
             }
           }
           userPage();
         }, [auth.token]);

    return (
        <div className="">
            <span>userPage</span>
            <div className="flex flex-col items-center justify-center">
                <span className="text-lg font-semibold">Appelido: {user.apellido}</span>
                <span className="text-lg font-semibold">Nom: {user.name}</span>
                <span className="text-lg font-semibold">Type d'abonnement: {user.subscription.plan}</span>
                <span className="text-lg font-semibold">Date de fin d'abonnement: {user.subscription.endDate}</span>
                <span className="text-lg font-semibold">Points restants: {user.subscription.pointsLeft}</span>
                <span className="text-lg font-semibold">Statut de paiement: {user.subscription.amount2Pay}</span>
                <span className="text-lg font-semibold">Montant à payer: {user.subscription.amount2Pay}</span>
                <span className="text-lg font-semibold">Administrateur: {user.isAdmin ? "Oui" : "Non"}</span>
            </div>
        </div>
    )
}
 
export default UserPage 
