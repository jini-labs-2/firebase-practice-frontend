import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Signup from './pages/Signup';
import Signin from './pages/Signin';
import Fileupdown from './pages/fileupdown';

function App() {
  return (
    <Routes>
      <Route path="/signup" element={<Signup />}> </Route>
      <Route path="/signin" element={<Signin />}> </Route>
      <Route path="/updown" element={<Fileupdown />}> </Route>
    </Routes>
  );
}

export default App;