import React from 'react';
import LoadingScreen from '../screens/loading-screen';
import FileScreen from '../screens/file-screen';
import { Footer, Navbar, Tag } from '../../../components';
import UploadScreen from '../screens/upload-screen';

const Home = () => {
  return (
    <React.Fragment>
      <Navbar />
      <main className='app transition-all ease-in overflow-y-auto'>
        <UploadScreen />
        <LoadingScreen />
        <FileScreen />
        <Tag />
      </main>
      <Footer />
    </React.Fragment>
  );
};

export default Home;
