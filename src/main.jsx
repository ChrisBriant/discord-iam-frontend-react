import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Provider as DataProvider } from "./context/DataContext.jsx";
import { Provider as AuthProvider } from "./context/AuthContext.jsx";


createRoot(document.getElementById('root')).render(
  <AuthProvider>
    <DataProvider>
      <App />
    </DataProvider>
  </AuthProvider>
)
