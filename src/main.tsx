import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter } from 'react-router-dom'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { Toaster } from 'react-hot-toast'
import AuthProvider from '@contexts/AuthProvider.tsx'
import UIProvider from '@contexts/UIProvider.tsx'
import QueryProvider from '@contexts/QueryProvider.tsx'


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <QueryProvider>
        <AuthProvider>
          <UIProvider>
            <App />
            <ReactQueryDevtools initialIsOpen={false} />
            <Toaster position="top-center" />
          </UIProvider>
        </AuthProvider>
      </QueryProvider>
    </BrowserRouter>
  </StrictMode>
)
