import type { newSData } from "../types/studentAction";
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000';

export async function NewRegistrantRequest( newRData : newSData) {
    const { apellido, name, subscription, payementStatus, amount2Pay } = newRData
    
    try {
        const newRegistrant = await fetch(`http://localhost:4000/students/addNewStudent`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                apellido: apellido,
                name: name,
                subscription: subscription,
                payementStatus: payementStatus,
                amount2Pay: amount2Pay
            })
        })
        const response = await newRegistrant.json()
        console.log("response", response)

        if (!response.result) return response;
        const getStudents = await fetch(`${API_URL}/students`)

        const response2 = await getStudents.json()
        console.log("response2", response2)

        return response2
    } catch (error) {
        return error
    }
}