import { useState } from 'react'
import { useAppDispatch } from './store/hooks';

import { signInRequest } from './api/authRequest';
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
      if (!response.result) {
        handleMsgModalAction.setIsMsgModalOpen(true);
        handleMsgModalAction.setMsgModalContent({result: response.result, message: response.message});
        console.log("responseSignIn", response);

        return;
      }
      dispatch(addAuth(response.data));

      handleModalAction.setIsModalOpen(false);
      handleModalAction.setModalComponent("Home")
    }
    catch (error) {
      console.error("Error during sign in:", error);
    }
  }


  return (
    <div className='flex flex-col justify-evenly items-center w-full h-full mt-1'>
      <h3 className="xxxs:text-3xl xxxs:mb-1 xxs:text-4xl xxs:mb-1 sm:text-4xl sm:mb-2 2xl:text-6xl 2xl:mb-3 text-center text-white font-cascadiaCode   ">
        Se connecter
      </h3>
      <input className="xxxs:w-8/10 xxxs:my-2 xxxs:pl-2 xxxs:py-1 xxs:w-8/10 xxs:my-2 xxs:pl-2 xxs:py-1 sm:w-8/10 sm:my-2 sm:pl-2 sm:py-2 2xl:w-7/10 my-2 pl-2 py-2 border-2 border-black bg-white rounded-md xxxs:text-base xxs:text-xl sm:text-2xl 2xl:text-3xl"
        id="apellido"
        type="text"
        placeholder="apellido"
        value={apellido}
        onChange={(e) => setApellido(e.target.value)}
      />
      <input className="xxxs:w-8/10 xxxs:my-2 xxxs:pl-2 xxxs:py-1 xxs:w-8/10 xxs:my-2 xxs:pl-2 xxs:py-1 sm:w-8/10 sm:my-2 sm:pl-2 sm:py-2 2xl:w-7/10 my-2 pl-2 py-1 border-2 border-black bg-white rounded-md xxxs:text-base xxs:text-xl sm:text-2xl 2xl:text-3xl "
        id="email"
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input className="xxxs:w-8/10 xxxs:my-2 xxxs:pl-2 xxxs:py-1 xxs:w-8/10 xxs:my-2 xxs:pl-2 xxs:py-1 sm:w-8/10 sm:my-2 sm:pl-2 sm:py-2 2xl:w-7/10 my-2 pl-2 py-1 border-2 border-black bg-white rounded-md xxxs:text-base xxs:text-xl sm:text-2xl 2xl:text-3xl"
        id="password"
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button className="w-fit bg-black border-2 rounded-full px-4 py-2 mt-3 mb-6 border-black xxxs:text-xl xxs:text-2xl sm:text-2xl 2xl:text-3xl text-white font-cascadiaCode font-semibold hover:bg-white hover:border-white  hover:text-[#FFCB00] hover:cursor-pointer " onClick={handleSignIn}>
        Connexion
      </button>
    </div>
  )
}

export default SignIn
