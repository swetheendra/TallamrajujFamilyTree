import Profile from './Profile';
import { Route, Routes } from 'react-router-dom';

import { useEffect } from "react"
import jwt_decode from "jwt-decode";

function App() {

  useEffect(() => {
    console.log('inside effect....');
    fetch("https://tallamrajutree.azurewebsites.net/.auth/me",{
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json'
      },
    })
    .then(resp => resp.json())
    .then(data => {
      console.log('data.....', data);
      const token = data[0].id_token;
      const decoded = jwt_decode(token);
      const hasRole = decoded?.roles?.includes("App.Writer");
      console.log('has role....', hasRole,' ', decoded?.roles?.includes("App.Manage") );
    })
    .catch(err => console.log('error...', err));
  }, [])
  

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
