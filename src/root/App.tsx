import { Routes, Route } from 'react-router-dom';
import {
  Authentication,
  Dashboard,
  FilesExplorer,
  Home,
  DashboardFileDetails,
  UserFilesUpload,
} from '../pages';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import DashboardMusicFiles from '../pages/dashboard/routes/music';
import DashboardVideosFiles from '../pages/dashboard/routes/video';
import DashboardImageFiles from '../pages/dashboard/routes/image';
import DashboardApplicationFiles from '../pages/dashboard/routes/application';
import DashboardDocumentFiles from '../pages/dashboard/routes/document';
import DashboardRecentDocuments from '../pages/dashboard/routes/recent';

const App = () => {
  return (
    <>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/authenticate' element={<Authentication />} />
        <Route path='/dashboard' element={<Dashboard />} />
        <Route
          path='/dashboard/:fileCategory/:fileId'
          element={<DashboardFileDetails />}
        />
        <Route path='/dashboard/music/' element={<DashboardMusicFiles />} />
        <Route path='/dashboard/video/' element={<DashboardVideosFiles />} />
        <Route path='/dashboard/image/' element={<DashboardImageFiles />} />
        <Route
          path='/dashboard/recent/'
          element={<DashboardRecentDocuments />}
        />
        <Route
          path='/dashboard/application/'
          element={<DashboardApplicationFiles />}
        />
        <Route
          path='/dashboard/document/'
          element={<DashboardDocumentFiles />}
        />
        <Route path='/dashboard/upload' element={<UserFilesUpload />} />
        <Route path='/files' element={<FilesExplorer />} />
        <Route path='/files/:fileId' element={<FilesExplorer />} />
        <Route path='/files/' element={<FilesExplorer />} />
      </Routes>
      <ToastContainer />
    </>
  );
};

export default App;
