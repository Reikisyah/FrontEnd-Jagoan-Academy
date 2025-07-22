import React from 'react'
import { createRoot } from 'react-dom/client'
import AppRoutes from './App'
import './index.css'
import { BrowserRouter } from 'react-router-dom'

const container = document.getElementById('root')
console.log('Root container:', container)
const root = createRoot(container)
root.render(
  <BrowserRouter>
    <AppRoutes />
  </BrowserRouter>,
)
console.log('App rendered')
