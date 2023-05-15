import Profile from './Profile';
import { Route, Routes } from 'react-router-dom';

import { useEffect } from "react"

function App() {

  useEffect(() => {
    fetch("https://tallamrajutree.azurewebsites.net/.auth/me")
    .then(resp => resp.json())
    .then(data => console.log('data.....', data))
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
