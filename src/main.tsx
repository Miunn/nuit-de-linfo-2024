import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter, Route, Routes } from 'react-router'
import Home from './routes/Home.tsx'
import Login from './routes/Login.tsx'
import NotFound from './routes/NotFound.tsx'
import Dashboard from './routes/Dashboard.tsx'
import { Layout } from './routes/Layout.tsx'
import { Podcasts } from './routes/Podcasts.tsx'
import  BadLogin  from './routes/BadLogin.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="podcasts" element={<Podcasts />} />
          <Route path="login" element={<Login />} />
          <Route path="badlogin" element={<BadLogin />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
