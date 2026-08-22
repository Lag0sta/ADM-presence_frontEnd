import { useState, useEffect } from 'react'
import { useAppSelector, useAppDispatch } from './store/hooks';

import Header from "./Header"
import MainComp from "./MainComp"
import Modal from './Modal'
import MsgModal from './MsgModal'
import ModalAuth from './ModalAuth'
// import TestOrientation from './TestOrientation'
import {loadStudents} from "./utils/studentAction"

function App() {
  const [component, setComponent] = useState("home")
  const [modalComponent, setModalComponent] = useState("")
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isMsgModalOpen, setIsMsgModalOpen] = useState(false)
  const [msgModalContent, setMsgModalContent] = useState({result: false, message: ""})
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false)
  const [studentSubscription, setStudentSubscription] = useState("")
  const [studentFile, setStudentFile] = useState({})

  const handleModalAction = {isModalOpen, setIsModalOpen, modalComponent, setModalComponent}
  const handleMsgModalAction = {isMsgModalOpen, msgModalContent, setIsMsgModalOpen, setMsgModalContent}
  const handleAuthModalAction = {isAuthModalOpen, setIsAuthModalOpen}

  const auth = useAppSelector((state) => state.auth.value);

  const dispatch = useAppDispatch();
  
  useEffect(() => {
        if (!auth.token) return
        const loadStudentsData = {dispatch}

        loadStudents(loadStudentsData)
        
      }, [auth.token]);


  return (
    <div className='h-screen grid xxxs:grid-rows-[1fr_5fr_] xxs:grid-rows-[1fr_9fr_] sm:grid-rows-[1fr_5fr_] 2xl:portrait:grid-rows-[1fr_9fr_] 2xl:landscape:grid-rows-[1fr_6fr_] '>
      <header className='bg-black  text-white'>
        <Header handleModalAction={handleModalAction}
                setComponent={setComponent} />
      </header>
{/* <TestOrientation/> */}
      <main className='bg-gray-100'>
        <MainComp component={component}
                  handleModalAction={handleModalAction}
                  handleMsgModalAction={handleMsgModalAction}
                  handleAuthModalAction={handleAuthModalAction}
                  setStudentSubscription={setStudentSubscription} 
                  setStudentFile={setStudentFile} />
      </main>


      {isModalOpen &&
        <Modal handleModalAction={handleModalAction} 
               handleMsgModalAction={handleMsgModalAction}
               setComponent={setComponent}
               studentSubscription={studentSubscription}
               setStudentSubscription={setStudentSubscription}
               studentFile={studentFile}
               setStudentFile={setStudentFile}/>
      }
      {isMsgModalOpen &&
        <MsgModal handleMsgModalAction={handleMsgModalAction}
                   />
      }
      {isAuthModalOpen &&
        <ModalAuth handleAuthModalAction={handleAuthModalAction}/>
      }
      
    </div>
  )
}

export default App
