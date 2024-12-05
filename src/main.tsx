import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter, Route, Routes } from 'react-router'
import Home from './routes/Home.tsx'
import Login from './routes/Login.tsx'
import NotFound from './routes/NotFound.tsx'
import Game from './routes/Game.tsx'
import { Dashboard } from './routes/Dashboard.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="dashboard" element={<Dashboard />} />
      <Route path="login" element={<Login />} />
      <Route path="*" element={<NotFound />} />
      <Route path="game" element={<Game />} />
    </Routes>
    </BrowserRouter>
  </StrictMode>,
)
