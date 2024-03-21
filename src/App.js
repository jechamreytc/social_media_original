import { Route, Routes } from 'react-router-dom';
// import { useState } from 'react';
import Login from './Pages/Login';
import localStorage from 'react-secure-storage';
import SignUp from './Pages/SignUp';
// import NavigatorsLinks from './NavigatorsLinks';
// import Navigators from './components/Navigators';
import MainLayout from './MainLayout';
import Profile from './Timeline/Profile';
import { Toaster } from 'sonner';

function App() {
  localStorage.removeItem('url');
  if (localStorage.getItem("url") !== "http://localhost/socialmedia/api/") {
    localStorage.setItem("url", "http://localhost/socialmedia/api/");
  }

  console.warn("%cStop! Masisira buhay mo", "font-size: 75px; color: red;");


  return (
    <>
      <div className='bg-black vh-100'>
        <Toaster richColors position='top-center' duration={1500} />
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/signup' element={<SignUp />} />
          <Route path="*" element={<MainLayout />} />
          <Route path='/profile' element={<Profile />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
