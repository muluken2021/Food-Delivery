import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import StoreContextProvider from './context/StoreContext.jsx'
import { ThemeProvider } from "./context/ThemeContext";
import { ThemeProvider2 } from "./context/ThemeContext2";


createRoot(document.getElementById('root')).render(
 <BrowserRouter>
 
   <ThemeProvider>
    <ThemeProvider2>
    <StoreContextProvider>
        <App />
    </StoreContextProvider>
    </ThemeProvider2>
    </ThemeProvider>
  </BrowserRouter>
)
