import { useState } from 'react'
import { useAppDispatch } from './store/hooks';

import { signInRequest } from './utils/authAction';
import { addAuth } from './store/reducers/auth';

import type { handleModalAction, handleMsgModalAction } from './types/Types';

interface props {
  handleModalAction: handleModalAction;
  handleMsgModalAction: handleMsgModalAction;
}

function SignIn({ handleModalAction, handleMsgModalAction }: props) {
  const [apellido, setApellido] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useAppDispatch();

  const handleSignIn = async () => {
    const signInData = { apellido, email, password };
    try {
      const response = await signInRequest(signInData);
      if(response.errors) {
        console.error("Sign in failed:", response.message);
        console.log("response.errors", response.errors);
        handleMsgModalAction.setIsMsgModalOpen(true);
        handleMsgModalAction.setMsgModalContent(response.message);

        return;
      }
console.log("Sign in successful:", response.data);
      dispatch(addAuth(response.data));

      handleModalAction.setIsModalOpen(false);
      handleModalAction.setModalComponent("Home")
    }
    catch (error) {
      console.error("Error during sign in:", error);
    }
  }


  return (
    <div className='flex flex-col justify-evenly items-center w-full h-full mt-4 mb-10'>
      <h3 className="text-3xl text-center text-white mb-1">
        Se connecter
      </h3>
      <input className="border-2 border-black bg-white rounded-md pl-2 py-1 my-2"
        id="apellido"
        type="text"
        placeholder="apellido"
        value={apellido}
        onChange={(e) => setApellido(e.target.value)}
      />
      <input className="border-2 border-black bg-white rounded-md pl-2 py-1 my-2"
        id="email"
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input className="border-2 border-black bg-white rounded-md pl-2 py-1 my-2"
        id="password"
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button className="w-fit bg-black border-2 rounded-md px-2 py-1 mt-3 mb-6 border-black text-white hover:bg-white hover:text-black hover:cursor-pointer " onClick={handleSignIn}>
        Connexion
      </button>
    </div>
  )
}

export default SignIn
