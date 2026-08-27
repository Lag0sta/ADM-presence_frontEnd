import { useAppDispatch, useAppSelector } from './store/hooks';

import { logOutRequest } from './api/authRequest';
import { clearAuth } from './store/reducers/auth';

import type { handleModalAction } from './types/Types';

interface props {
  handleModalAction: handleModalAction;
  setComponent: (value: string) => void;
}

function ModalUser({ handleModalAction, setComponent }: props) {

  const dispatch = useAppDispatch();
  const auth = useAppSelector((state) => state.auth.value);

  const handleUserPage = () => {
    setComponent("userPage")
    handleModalAction.setIsModalOpen(false);
    handleModalAction.setModalComponent("");
  }

  const handleLogOut = async () => {
    const logOutData = auth;
    const response = await logOutRequest(logOutData);
    if (response.result) {
      dispatch(clearAuth());

      handleModalAction.setIsModalOpen(false);
      handleModalAction.setModalComponent("");
      setComponent("home")
    }
  }


  return (
    <div className='flex flex-col justify-evenly items-center w-full h-full mt-4  mx-4'>
      <h3 className="mb-1 portrait:xxxs:text-2xl landscape:xs:text-2xl  text-center text-black font-cascadiaCode ">
        Bonjour: <span className="text-white portrait:xxxs:text-3xl landscape:xs:text-3xl font-edoSZ">{auth.apellido}</span>
      </h3>
      <button className="w-fit bg-black border-2 rounded-md px-2 py-1 my-3 border-black text-white font-cascadiaCode hover:bg-white hover:text-black hover:cursor-pointer "
        onClick={handleUserPage}>
        Page Utilisateur
      </button>
      <button className="w-fit bg-black border-2 rounded-md px-4 py-1 my-3 border-black text-white font-cascadiaCode hover:bg-white hover:text-black hover:cursor-pointer "
        onClick={handleLogOut}>
        Deconnexion
      </button>
    </div>
  )
}

export default ModalUser
