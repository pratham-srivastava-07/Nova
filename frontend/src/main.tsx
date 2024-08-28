import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { ThemeProvider } from './providers/ThemProvider.tsx'
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from './providers/AuthProviders.tsx'
import { Toaster } from './components/ui/toaster.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
   <BrowserRouter>
      <AuthProvider>
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
          <App />
          <Toaster/>
        </ThemeProvider>
      </AuthProvider>
   </BrowserRouter>
  </StrictMode>,
)
