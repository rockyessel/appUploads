import React from 'react';
import UploadScreen from './upload-screen';
import LoadingScreen from './loading-screen';
import FileScreen from './file-screen';
import { Footer, Navbar, Tag } from '../../components';

const Home = () => {
  return (
    <React.Fragment>
      <Navbar />
      <main className='app transition-all ease-in'>
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
