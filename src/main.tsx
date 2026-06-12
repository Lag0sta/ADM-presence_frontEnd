import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { registerSW } from 'virtual:pwa-register'
import { Provider } from 'react-redux'
import {store} from './store/store'

const updateSW = registerSW({
  immediate: true,

  onNeedRefresh() {
    const ok = confirm("Nouvelle version disponible. Mettre à jour ?");
    if (ok) updateSW(true)
  },
})



ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
        <Provider store={store}>

    <App />
        </Provider>

  </React.StrictMode>,
)
