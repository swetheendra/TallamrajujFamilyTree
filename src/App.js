import Profile from './Profile';
import { Route, Routes } from 'react-router-dom';

import { useEffect } from "react"
import { useMsal, useAccount, useIsAuthenticated } from "@azure/msal-react";

function App() {

  const isAuthenticated = useIsAuthenticated();
  console.log('is authn....', isAuthenticated);
  const { instance, accounts } = useMsal();
  console.log('details....', instance, accounts);
  const account = useAccount(accounts[0] || {});
  console.log('details....', account);

  useEffect(() => {
    console.log('inside....');
    if (account) {
        instance.acquireTokenSilent({
            scopes: ["User.Read"],
            account: account
        }).then((response) => {
            console.log('token....',response.accessToken);
        });
    }
}, [account, instance]);

  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Profile id='1' />} />
        <Route path='/profile/:id' element={<Profile/>} />
      </Routes>
    </div>
  );
}

export default App;
