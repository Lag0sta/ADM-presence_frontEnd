import type { getURData } from "../types/userAction";

const API_URL =
  (import.meta.env.VITE_API_URL ?? 'http://localhost:4000')
    .replace(/\/$/, "");


export async function getUserRequest(getURData : getURData) {
    const { apellido, token } = getURData

    try {
         const getUser = await fetch(`${API_URL}/users/userInfo`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                apellido: apellido,
                token: token
            })
        })
       
        const response = await getUser.json()

        return response
    } catch (error) {
        console.error("Error fetching user:", error);
              
    }
  }
    
      