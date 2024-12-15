import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Loading from './pages/Loading.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Loading />
  </StrictMode>,
)
