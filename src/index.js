import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { MsalProvider } from '@azure/msal-react';
import { BrowserRouter } from "react-router-dom";
import {
  PublicClientApplication
} from '@azure/msal-browser';
import { msalConfig } from './AuthConfig';

const root = ReactDOM.createRoot(document.getElementById('root'));

const msalInstance = new PublicClientApplication(msalConfig);
// Default to using the first account if no account is active on page load
if (!msalInstance.getActiveAccount() && msalInstance.getAllAccounts().length > 0) {
  // Account selection logic is app dependent. Adjust as needed for different use cases.
  msalInstance.setActiveAccount(msalInstance.getAllAccounts()[0]);
  console.log('ins act.....');
}
console.log('app and active....', msalInstance,' ', msalInstance.getActiveAccount());

/*
var tokenRequest = {
  scopes: ["user.read"]
};

msalInstance.acquireTokenSilent(tokenRequest)
  .then(response => {
      // get access token from response
      console.log('token....',response.accessToken);
  })*/

root.render(
  <React.StrictMode>
    <MsalProvider instance={msalInstance}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
    </MsalProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
