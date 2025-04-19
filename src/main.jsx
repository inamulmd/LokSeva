import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { store } from './app/store.jsx';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom'; 
import { Toaster } from 'react-hot-toast'; 
import { AuthProvider } from './components/AuthContext'; 

// Render the application with necessary providers
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter> {/* Wrapping the app in BrowserRouter for routing */}
         <AuthProvider>
             <App />
            <Toaster position="top-center" reverseOrder={false} /> {/* Toaster for notifications */}
         </AuthProvider>
      </BrowserRouter>
    </Provider>
  </StrictMode>
);
