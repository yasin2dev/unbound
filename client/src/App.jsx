import { useEffect, useState } from 'react';
import Register from './components/Register';
import Login from './components/Login';
import { AuthProvider } from './middleware/AuthContext';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from './components/Dashboard';
import Unprotected from './components/Unprotected';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path='/' element={<Unprotected/>}/>
          <Route path='/register' element={<Register/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/dashboard' element={<Dashboard/>}/>
        </Routes>
      </Router>
    </AuthProvider>
  )
}


export default App
