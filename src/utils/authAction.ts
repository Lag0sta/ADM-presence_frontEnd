import type { signInData, logOutData } from "../types/authAction";
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000';

export async function signInRequest(signInData: signInData) {
    const { apellido, email, password } = signInData

    try {
        const newRegistrant = await fetch(`http://localhost:4000/auths/SignIn`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                apellido: apellido,
                email: email,
                password: password,
            })
        })
        const response = await newRegistrant.json()
        console.log("response", response)

        return response
    } catch (error) {
        return error
    }
}

export async function logOutRequest(logOutData: logOutData) {
    const { apellido, token } = logOutData

    try {
        const newRegistrant = await fetch(`http://localhost:4000/auths/logOut`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                apellido: apellido,
                token: token,
            })
        })
        const response = await newRegistrant.json()
        console.log("response", response)

        return response
    } catch (error) {
        return error
    }

}