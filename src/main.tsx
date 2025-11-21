import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import AppRoute from './route/AppRoute.tsx'



createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <BrowserRouter>
            {/* Render AppRoute แทน App */}
            <AppRoute />
        </BrowserRouter>
    </StrictMode>,
)
