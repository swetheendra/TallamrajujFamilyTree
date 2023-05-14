import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { MsalProvider } from '@azure/msal-react';
import { BrowserRouter } from "react-router-dom";
import {
  PublicClientApplication,
  LogLevel
} from '@azure/msal-browser';

const root = ReactDOM.createRoot(document.getElementById('root'));

const msal= {
  method: 'redirect', // 'redirect' | 'popup'
  auth: {
      clientId: '5f513774-e5ec-456c-8898-5a230bbdc2c5',
      authority: 'https://login.microsoftonline.com/organizations/',
  },
  cache: {
      cacheLocation: 'localStorage',
      storeAuthStateInCookie: false,
  },
  skScopes: ['openid', 'offline_access', 'profile'],
}

const msalConfig = {
  auth: {
      ...msal.auth,
      redirectUri: window.origin,
  },
  cache: msal.cache,
  system: {
      loggerOptions: {
          loggerCallback: (level, message, containsPii) => {
              if (containsPii) {
                  return;
              }
              switch (level) {
                  case LogLevel.Error:
                      console.log('error:', message);
                      return;
                  case LogLevel.Info:
                      console.log('info:', message);
                      return;
                  case LogLevel.Verbose:
                      console.log('verbose:', message);
                      return;
                  case LogLevel.Warning:
                      console.log('warn:', message);
                      return;
                  default:
                      console.log(message);
              }
          },
      },
      windowHashTimeout: 9000, // Applies just to popup calls - In milliseconds
      iframeHashTimeout: 9000, // Applies just to silent calls - In milliseconds
      loadFrameTimeout: 9000, // Applies to both silent and popup calls - In milliseconds
  },
};

const webapp = new PublicClientApplication(msalConfig);
root.render(
  <React.StrictMode>
    <MsalProvider instance={webapp}>
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
