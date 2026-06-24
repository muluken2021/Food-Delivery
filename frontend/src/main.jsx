import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import StoreContextProvider from './context/StoreContext.jsx'
import { ThemeProvider } from "./context/ThemeContext";
import { LanguageProvider } from './context/LanguageContext.jsx';
import { CurrencyProvider } from './context/CurrencyContext.jsx';



createRoot(document.getElementById('root')).render(
 <BrowserRouter>
   <LanguageProvider>
     <CurrencyProvider>
       <ThemeProvider>
         <StoreContextProvider>
             <App />
         </StoreContextProvider>
       </ThemeProvider>
     </CurrencyProvider>
   </LanguageProvider>
  </BrowserRouter>
)
