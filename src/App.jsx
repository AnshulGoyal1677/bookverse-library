import React, { useState } from 'react';
import Login from './pages/Login';
import Signup from './pages/Signup';
import './App.css';

function App() {
  const [currentPage, setCurrentPage] = useState('login');

  return (
    <div>
      {currentPage === 'login' ? (
        <Login onSwitch={setCurrentPage} />
      ) : (
        <Signup onSwitch={setCurrentPage} />
      )}
    </div>
  );
}

export default App;