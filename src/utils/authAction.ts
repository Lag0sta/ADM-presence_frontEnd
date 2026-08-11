import type { signInData, logOutData, aRequestData } from "../types/authAction";
const API_URL = import.meta.env.VITE_API_URL.replace(/\/$/, "") 


let resolvePassword: ((password: string) => void) | null = null;
let resolveEmail: ((email: string) => void) | null = null;


export async function askPassword (): Promise<string> {
  return new Promise((resolve) => {
    // affichage d'une modal, puis :
     resolvePassword = resolve;
  });
};

export function submitPassword(password: string) {
  resolvePassword?.(password);
  resolvePassword = null;
}

export async function askEmail (): Promise<string> {
  return new Promise((resolve) => {
    // affichage d'une modal, puis :
     resolveEmail = resolve;
  });
};

export function submitEmail(password: string) {
  resolvePassword?.(password);
  resolvePassword = null;
}

export async function authRequest(aRequestData : aRequestData){
    const { token, password, email } = aRequestData

    try {
        const auth = await fetch(`${API_URL}/auths/authValidation`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                token: token,
                password: password,
                email: email
            })
        })
        const response = await auth.json()
        console.log("responseAuth", response)

        return response
    } catch (error) {
        return error
    }
}

export async function signInRequest(signInData: signInData) {
    const { apellido, email, password } = signInData

    try {
        const signIn = await fetch(`${API_URL}/auths/SignIn`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                apellido: apellido,
                email: email,
                password: password,
            })
        })

        
        const response = await signIn.json()
        console.log("responseSignIn", response)

        return response
    } catch (error) {
        return error
    }
}

export async function logOutRequest(logOutData: logOutData) {
    const { apellido, token } = logOutData

    try {
        const logOut = await fetch(`${API_URL}/auths/logOut`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                apellido: apellido,
                token: token,
            })
        })
        const response = await logOut.json()
        console.log("responseLogOut", response)

        return response
    } catch (error) {
        return error
    }

}