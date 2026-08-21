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
        handleMsgModalAction.setMsgModalContent({ result: response.result, message: response.message });
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
    <div className='w-full h-full flex flex-col justify-evenly items-center mt-1 w-full'>
      <h3 className="portrait:xxxs:text-3xl portrait:xxxs:mb-1 xxxs:text-3xl landscape:xs:mb-1 xxs:text-4xl xxs:mb-1 sm:text-4xl sm:mb-2 2xl:text-6xl 2xl:mb-3 text-center text-white font-cascadiaCode   ">
        Se connecter
      </h3>
      <div className='portrait:flex portrait:flex-col portrait:justify-evenly portrait:items-center 
      xs:landscape:flex xs:landscape:flex-wrap xs:landscape:flex-row xs:landscape:justify-start xs:landscape:ml-7 
      md:landscape:flex-col md:landscape:justify-evenly md:landscape:items-center md:landscape:ml-0'>
        <input className="portrait:xxxs:w-9/10 portrait:xxxs:my-2 portrait:xxxs:pl-2 portrait:xxxs:py-1 portrait:xxxs:text-base 
        portrait:lg:w-9/10 portrait:lg:my-2 portrait:lg:pl-2 portrait:lg:py-1 portrait:lg:text-xl 
        landscape:xs:w-3/10 landscape:xs:landscape:pl-2 landscape:xs:py-1 landscape:xs:text-md 
        landscape:md:w-10/10 landscape:md:landscape:pl-2 landscape:md:py-1 landscape:md:text-md 
        xxxs:my-1 xxs:w-8/10 xxs:my-2 xxs:pl-2 xxs:py-1 sm:w-8/10 sm:my-2 sm:pl-2 sm:py-2 2xl:w-7/10 my-2 pl-2 py-2 border-2 border-black bg-white rounded-md  xxs:text-xl sm:text-2xl 2xl:text-3xl"
          id="apellido"
          type="text"
          placeholder="apellido"
          value={apellido}
          onChange={(e) => setApellido(e.target.value)}
        />
        <input className="portrait:xxxs:w-9/10 portrait:xxxs:my-2 portrait:xxxs:pl-2 portrait:xxxs:py-1 portrait:xxxs:text-base 
        portrait:lg:w-9/10 portrait:lg:my-2 portrait:lg:pl-2 portrait:lg:py-1 portrait:lg:text-xl
        landscape:xs:w-6/10 landscape:xs:landscape:pl-2 landscape:xs:py-1 landscape:xs:text-md landscape:xs:ml-2 
        landscape:md:w-10/10 landscape:md:landscape:pl-2 landscape:md:py-1 landscape:md:text-md md:landscape:ml-0
        xxxs:my-1 xxs:w-8/10 xxs:my-2 xxs:pl-2 xxs:py-1 sm:w-8/10 sm:my-2 sm:pl-2 sm:py-2 2xl:w-7/10 my-2 pl-2 py-1 border-2 border-black bg-white rounded-md  xxs:text-xl sm:text-2xl 2xl:text-3xl "
          id="email"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input className="portrait:xxxs:w-9/10 portrait:xxxs:my-2 portrait:xxxs:pl-2 portrait:xxxs:py-1 portrait:xxxs:text-base 
        portrait:lg:w-9/10 portrait:lg:my-2 portrait:lg:pl-2 portrait:lg:py-1 portrait:lg:text-xl
        landscape:xs:w-3/10 landscape:xs:landscape:pl-2 landscape:xs:py-1 landscape:xs:text-md 
        landscape:md:w-10/10 landscape:md:landscape:pl-2 landscape:md:py-1 landscape:md:text-md 
        xxxs:my-1 xxs:w-8/10 xxs:my-2 xxs:pl-2 xxs:py-1 sm:w-8/10 sm:my-2 sm:pl-2 sm:py-2 2xl:w-7/10 my-2 pl-2 py-1 border-2 border-black bg-white rounded-md  xxs:text-xl sm:text-2xl 2xl:text-3xl"
          id="password"
          type="password"
          placeholder="mdp"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button className="w-fit bg-black border-2 rounded-full px-4 py-2 portrait:mt-3 portrait:mb-6 landscape:mt-2 landscape:mb-4  border-black xxxs:portrait:text-xl xxxs:landscape:text-lg  xxs:text-2xl sm:text-2xl 2xl:text-3xl text-white font-cascadiaCode font-semibold cursor-pointer hover:bg-white hover:border-white  hover:text-[#FFCB00]  " onClick={handleSignIn}>
        Connexion
      </button>
    </div>
  )
}

export default SignIn
