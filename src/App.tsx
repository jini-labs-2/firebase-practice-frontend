import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Signup from './pages/Signup';
import Signin from './pages/Signin';

function App() {
  return (
    <Routes>
      <Route path="/signup" element={<Signup />}> </Route>
      <Route path="/signin" element={<Signin />}> </Route>
    </Routes>
  );
}

export default App;