import { useState } from 'react'

import Header from "./Header"
import MainComp from "./MainComp.tsx"
import Modal from './Modal.tsx'

function App() {
  const [component, setComponent] = useState("home")
  const [isModalOpen, setIsModalOpen] = useState(false)
  const date = new Date()
  const month = date.getMonth() + 1
  console.log("month :", month)
  return (
    <div className='h-screen grid grid-rows-[1fr_3fr_2fr]  '>
      <header className='bg-gray-900 text-white'>
        <Header setComponent={setComponent} />
      </header>

      <main className='bg-gray-100'>
        <MainComp component={component}
                  setIsModalOpen={setIsModalOpen} />
      </main>

      <footer className='bg-[#FFCB00]'>
        FOOTER
      </footer>

      {isModalOpen &&
        <Modal setIsModalOpen={setIsModalOpen}/>
      }


    </div>
  )
}

export default App
