import { Routes, Route } from 'react-router-dom';
import { Authentication, Dashboard, Home, DashboardFileDetails, UserFilesUpload, AccessPage } from '../pages';
import { ToastContainer } from 'react-toastify';
import DashboardMusicFiles from '../pages/dashboard/music';
import DashboardVideosFiles from '../pages/dashboard/video';
import DashboardImageFiles from '../pages/dashboard/image';
import DashboardApplicationFiles from '../pages/dashboard/application';
import DashboardDocumentFiles from '../pages/dashboard/document';
import DashboardRecentDocuments from '../pages/dashboard/recent';
import FileSearchUsers from '../pages/dashboard/file-search-users';
import DashboardSettings from '../pages/dashboard/settings';
import React from 'react';
import 'react-toastify/dist/ReactToastify.css';
import AccessDocumentPage from '../pages/access/$id';

const App = () => {
  return (
    <React.Fragment>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/authenticate' element={<Authentication />} />
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/access' element={<AccessPage />} />
        <Route path='/access/:id' element={<AccessDocumentPage />} />
        <Route path='/dashboard/:fileCategory/:fileId' element={<DashboardFileDetails />} />
        <Route path='/dashboard/music' element={<DashboardMusicFiles />} />
        <Route path='/dashboard/video' element={<DashboardVideosFiles />} />
        <Route path='/dashboard/image' element={<DashboardImageFiles />} />
        <Route path='/dashboard/recent' element={<DashboardRecentDocuments />} />
        <Route path='/dashboard/application' element={<DashboardApplicationFiles />} />
        <Route path='/dashboard/document' element={<DashboardDocumentFiles />} />
        <Route path='/dashboard/settings' element={<DashboardSettings />} />
        <Route path='/dashboard/upload' element={<UserFilesUpload />} />
        <Route path='/dashboard/search' element={<FileSearchUsers />} />
      </Routes>
      <ToastContainer />
    </React.Fragment>
  );
};

export default App;
