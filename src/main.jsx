import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { C2 } from './testๆๆ/C2.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
    <C2 />
  </StrictMode>,
)
