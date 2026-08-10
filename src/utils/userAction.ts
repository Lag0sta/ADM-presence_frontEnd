import type { getURData, updateUFData } from "../types/userAction";

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
    
export async function UpdateUserFileRequest( updateUFData : updateUFData) {
    const { token, updateData } = updateUFData
    
    try {
        const newRegistrant = await fetch(`${API_URL}/users/updateUserFile`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                token: token,
                updateData: updateData
            })
        })
        const response = await newRegistrant.json()
        console.log("responseTSDFKSSEF", response)

        return response

    } catch (error) {
        return error
    }
}