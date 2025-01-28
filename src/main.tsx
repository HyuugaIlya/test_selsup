import { createRoot } from 'react-dom/client'
import { StrictMode } from 'react'
import { App, AppF } from './App.tsx'

import './index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <>
      <App />
      <AppF />
    </>
  </StrictMode>,
)