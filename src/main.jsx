import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Provider as DataProvider } from "./context/DataContext.jsx";
import { Provider as AuthProvider } from "./context/AuthContext.jsx";
import { BrowserRouter } from "react-router-dom";

createRoot(document.getElementById('root')).render(

  <AuthProvider>
    <DataProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
    </DataProvider>
  </AuthProvider>

);
