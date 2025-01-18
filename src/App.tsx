import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Signup from './pages/Signup';
import Signin from './pages/Signin';
import Fileupload from './pages/fileupload';
import Filelist from './pages/filelist';

function App() {
  return (
    <Routes>
      <Route path="/signup" element={<Signup />}> </Route>
      <Route path="/signin" element={<Signin />}> </Route>
      <Route path="/upload" element={<Fileupload />}> </Route>
      <Route path="/filelist" element={<Filelist />}> </Route>
    </Routes>
  );
}

export default App;