import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Authentication, Dashboard, Home } from '../pages';

const App = () => {
  const [clicked, setClicked] = React.useState(true);

  React.useEffect(() => {
    const timeout = setTimeout(() => {
      setClicked(true);
    }, 5000);
    return () => clearTimeout(timeout);
  }, [clicked]);

  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/authenticate' element={<Authentication />} />
      <Route path='/dashboard' element={<Dashboard />} />
    </Routes>
  );
};

export default App;
