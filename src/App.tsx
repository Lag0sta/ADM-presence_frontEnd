import { useState } from 'react'

import Header from "./Header"
import MainComp from "./MainComp.tsx"
import Modal from './Modal.tsx'

function App() {
  const [component, setComponent] = useState("home")
  const [modalComponent, setModalComponent] = useState("")
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleModalAction = {isModalOpen, setIsModalOpen, modalComponent, setModalComponent}

  return (
    <div className='h-screen grid grid-rows-[1fr_3fr_2fr]  '>
      <header className='bg-gray-900 text-white'>
        <Header handleModalAction={handleModalAction}
                setComponent={setComponent} />
      </header>

      <main className='bg-gray-100'>
        <MainComp component={component}
                  handleModalAction={handleModalAction} />
      </main>

      <footer className='bg-[#FFCB00]'>
        FOOTER
      </footer>

      {isModalOpen &&
        <Modal handleModalAction={handleModalAction} setComponent={setComponent}/>
      }


    </div>
  )
}

export default App
