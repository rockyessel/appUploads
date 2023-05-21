import { Routes, Route } from 'react-router-dom';
import { Authentication, Dashboard, Home } from '../pages';

const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/authenticate' element={<Authentication />} />
      <Route path='/dashboard' element={<Dashboard />} />
    </Routes>
  );
};

export default App;
