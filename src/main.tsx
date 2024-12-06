import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter, Route, Routes } from 'react-router'
import Home from './routes/Home.tsx'
import Login from './routes/Login.tsx'
import NotFound from './routes/NotFound.tsx'
import Predict from './routes/Predict.tsx'
import Dashboard from './routes/Dashboard.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="login" element={<Login />} />
      <Route path="predict" element={<Predict />} />
      <Route path="dashboard" element={<Dashboard />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
    </BrowserRouter>
  </StrictMode>,
)
