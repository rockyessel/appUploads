import { Routes, Route } from 'react-router-dom';
import {
  Authentication,
  Dashboard,
  FileDetailPage,
  FilesExplorer,
  Home,
  DashboardFileDetails,
} from '../pages';

const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/authenticate' element={<Authentication />} />
      <Route path='/dashboard' element={<Dashboard />} />
      <Route path='/dashboard/:fileId' element={<DashboardFileDetails />} />
      <Route path='/files' element={<FilesExplorer />} />
      <Route path='/files/:fileId' element={<FileDetailPage />} />
    </Routes>
  );
};

export default App;
