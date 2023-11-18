import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext"
import { PayPalScriptProvider } from "@paypal/react-paypal-js"
import AOS from 'aos';
import 'aos/dist/aos.css'; // You can also use <link> for styles


const root = ReactDOM.createRoot(document.getElementById('root'));
// ..
AOS.init({delay: 900, 
duration: 800,
});
root.render(
  // <React.StrictMode>
  <BrowserRouter>
    <PayPalScriptProvider
    options ={{
      "clientId": process.env.REACT_APP_PAYPAL_CLIENT_ID,
    }} >
      <AuthProvider>
        <App />
      </AuthProvider>
    </PayPalScriptProvider>
  </BrowserRouter>

  // </React.StrictMode>
);

