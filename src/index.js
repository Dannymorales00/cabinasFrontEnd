import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
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

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
