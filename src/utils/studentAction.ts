import type { newSData, newSubData } from "../types/studentAction";
const API_URL =
  (import.meta.env.VITE_API_URL ?? 'http://localhost:4000')
    .replace(/\/$/, "");

export async function getStudentsRequest() {
    try {
        const getStudents = await fetch(`${API_URL}/students/`)
        const response = await getStudents.json()

        return response
    } catch (error) {
        console.error("Error fetching students:", error);
    }
}

export async function NewRegistrantRequest( newSData : newSData) {
    const { apellido, name, subscription, paymentStatus, amount2Pay } = newSData
    
    try {
        const newRegistrant = await fetch(`${API_URL}/students/addNewStudent`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                apellido: apellido,
                name: name,
                subscriptionType: subscription,
                paymentStatus: paymentStatus,
                amount2Pay: amount2Pay
            })
        })
        const response = await newRegistrant.json()
        console.log("responseOG", response)

        return response

    } catch (error) {
        return error
    }
}

export async function NewSubscriptionRequest( newSubData : newSubData) {
    const { studentID, token, subscription, paymentStatus, amount2Pay } = newSubData
    
    try {
        const newRegistrant = await fetch(`${API_URL}/students/newSubscription`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                token: token,
                studentId: studentID,
                subscriptionType: subscription,
                paymentStatus: paymentStatus,
                amount2Pay: amount2Pay
            })
        })
        const response = await newRegistrant.json()
        console.log("responseTSDFKSSEF", response)

        return response

    } catch (error) {
        return error
    }
}