import { Route, Routes } from 'react-router-dom';
// import { useState } from 'react';
import Login from './Pages/Login';
import localStorage from 'react-secure-storage';
import SignUp from './Pages/SignUp';
import './global.css';
// import NavigatorsLinks from './NavigatorsLinks';
// import Navigators from './components/Navigators';
import MainLayout from './MainLayout';


function App() {
  localStorage.removeItem('url');
  if (localStorage.getItem("url") !== "http://localhost/socialmedia/api/") {
    localStorage.setItem("url", "http://localhost/socialmedia/api/");
  }
  // const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <>
      <div >
        {/* <Navigators as='/navigator' /> */}
        {/* {isAuthenticated && <NavigatorsLinks />} */}

        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/signup' element={<SignUp />} />
          <Route path="*" element={<MainLayout />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
