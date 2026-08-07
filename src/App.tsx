import { useState, useEffect } from 'react'
import { useAppSelector, useAppDispatch } from './store/hooks';

import Header from "./Header"
import MainComp from "./MainComp"
import Modal from './Modal'
import MsgModal from './MsgModal'

import { getStudentsRequest } from './utils/studentAction';
import { getStudents } from './store/reducers/students';

function App() {
  const [component, setComponent] = useState("home")
  const [modalComponent, setModalComponent] = useState("")
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isMsgModalOpen, setIsMsgModalOpen] = useState(false)
  const [msgModalContent, setMsgModalContent] = useState("")
  const [studentSubscription, setStudentSubscription] = useState("")
  const [studentFile, setStudentFile] = useState({})

  const handleModalAction = {isModalOpen, setIsModalOpen, modalComponent, setModalComponent}
  const handleMsgModalAction = {isMsgModalOpen, msgModalContent, setIsMsgModalOpen, setMsgModalContent}
  
  const auth = useAppSelector((state) => state.auth.value);
  console.log("MainComp component:", component, "yeah");

  const dispatch = useAppDispatch();
  
  useEffect(() => {
        if (!auth.token) return
        const initStudents = async () => {
          try {
            const students = await getStudentsRequest();
            console.log("Students fetched:", students);
            dispatch(getStudents(students.data));
    
          } catch (error) {
            console.error("Error fetching students:", error);
          }
        }
        initStudents();
      }, [auth.token]);


  return (
    <div className='h-screen grid grid-rows-[1fr_5fr_]  '>
      <header className='bg-gray-900 text-white'>
        <Header handleModalAction={handleModalAction}
                setComponent={setComponent} />
      </header>

      <main className='bg-gray-100'>
        <MainComp component={component}
                  handleModalAction={handleModalAction}
                  handleMsgModalAction={handleMsgModalAction}
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
      
    </div>
  )
}

export default App
