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
    <div className=' 
    portrait:xxxs:w-[17rem] portrait:xxs:w-[20rem]
    landscape:xs:h-fit landscape:md:w-fit flex flex-col justify-evenly items-center w-full'>
      <h3 className="portrait:xxxs:text-3xl portrait:xxxs:mb-1 xxxs:text-3xl landscape:xs:mb-2 landscape:xs:text-3xl landscape:md:text-4xl text-center text-white font-cascadiaCode   ">
        Se connecter
      </h3>
      <div className='w-full 
      portrait:flex portrait:flex-col portrait:justify-evenly portrait:items-center  
      landscape:xs:w-[25rem] landscape:xs:h-fit landscape:xs:flex landscape:xs:flex-wrap landscape:xs:flex-row landscape:xs:justify-start landscape:xs:items-center landscape:xs:ml-7 
      landscape:sm:w-[30rem] landscape:sm:h-fit landscape:sm:flex landscape:sm:flex-wrap
      landscape:sm:flex-row landscape:xs:justify-start landscape:sm:items-center landscape:sm:ml-7
      landscape:md:w-[20rem] landscape:md:h-fit landscape:md:flex landscape:md:flex-col landscape:md:justify-evenly landscape:md:items-center landscape:md:ml-0
      landscape:md:w-[20rem] landscape:md:h-fit landscape:md:flex landscape:md:flex-col landscape:md:justify-evenly landscape:md:items-center landscape:md:ml-0'>
        <input className="portrait:xxxs:w-8/10 portrait:xxxs:my-2 portrait:xxxs:pl-2 portrait:xxxs:py-1 portrait:xxxs:text-md
        portrait:xxs:w-8/10 portrait:xxs:my-2 portrait:xxs:pl-2 portrait:xxs:py-1 portrait:xxs:text-lg 
        portrait:lg:w-8/10 portrait:lg:my-2 portrait:lg:pl-2 portrait:lg:py-1 portrait:lg:text-xl 
        landscape:xs:w-3/10 landscape:xs:h-[2.2rem] landscape:xs:m-0 landscape:xs:landscape:pl-2  landscape:xs:text-lg 
        landscape:sm:w-3/10 landscape:sm:h-[2.5rem] landscape:sm:m-0 landscape:sm:landscape:pl-2  landscape:sm:text-xl 
        landscape:md:w-8/10 landscape:md:m-0 landscape:md:my-1 landscape:md:text-md landscape:md:landscape:pl-2 
        my-2 pl-2 py-2 border-2 border-black bg-white rounded-md"
          id="apellido"
          type="text"
          placeholder="apellido"
          value={apellido}
          onChange={(e) => setApellido(e.target.value)}
        />
        <input className="
        portrait:xxxs:w-8/10 portrait:xxxs:my-2 portrait:xxxs:pl-2 portrait:xxxs:py-1 portrait:xxxs:text-base 
        portrait:xxs:w-8/10 portrait:xxs:my-2 portrait:xxs:pl-2 portrait:xxs:py-1 portrait:xxs:text-lg
        portrait:lg:w-8/10 portrait:lg:my-2 portrait:lg:pl-2 portrait:lg:py-1 portrait:lg:text-xl
        landscape:xs:w-6/10 landscape:xs:h-[2.2rem] landscape:xs:m-0 landscape:xs:landscape:pl-2 landscape:xs:py-0 landscape:xs:text-md landscape:xs:ml-2 landscape:xs:text-lg
        landscape:sm:w-6/10 landscape:sm:h-[2.5rem] landscape:xs:m-0 landscape:sm:landscape:pl-2 landscape:xs:py-0 landscape:sm:text-xl
        landscape:md:w-8/10 landscape:md:landscape:pl-2 landscape:md:py-1 landscape:md:text-md md:landscape:ml-0
        my-2 pl-2 py-1 border-2 border-black bg-white rounded-md"
          id="email"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input className="
        portrait:xxxs:w-8/10 portrait:xxxs:my-2 portrait:xxxs:pl-2 portrait:xxxs:py-1 portrait:xxxs:text-base 
        portrait:xxs:w-8/10 portrait:xxs:my-2 portrait:xxs:pl-2 portrait:xxs:py-1 portrait:xxs:text-lg
        portrait:lg:w-8/10 portrait:lg:my-2 portrait:lg:pl-2 portrait:lg:py-1 portrait:lg:text-xl
        landscape:xs:w-3/10 landscape:xs:h-[2.2rem] landscape:xs:mt-1 landscape:xs:landscape:pl-2 landscape:xs:py-1 landscape:xs:text-lg 
        landscape:sm:w-3/10 landscape:sm:h-[2.5rem] landscape:sm:mt-1 landscape:sm:landscape:pl-2 landscape:sm:py-1 landscape:sm:text-xl
        landscape:md:w-8/10 landscape:md:landscape:pl-2 landscape:md:py-1 landscape:md:text-md 
        my-2 pl-2 py-1 border-2 border-black bg-white rounded-md"
          id="password"
          type="password"
          placeholder="mdp"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button className="w-fit bg-black border-2 rounded-full px-4 py-2 portrait:mt-3   border-black xxxs:portrait:text-xl xxxs:text-lg  landscape:xs:mt-0 landscape:xs:mb-0 landscape:xs:text-lg landscape:xxs:text-2xl sm:text-2xl 2xl:text-3xl text-white font-cascadiaCode font-semibold cursor-pointer hover:bg-white hover:border-white  hover:text-[#FFCB00]  " onClick={handleSignIn}>
        Connexion
      </button>
    </div>
  )
}

export default SignIn
