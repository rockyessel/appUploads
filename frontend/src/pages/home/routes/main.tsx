import React from 'react';
import LoadingScreen from '../screens/loading-screen';
import FileScreen from '../screens/file-screen';
import { Footer, Navbar, Tag } from '../../../components';
import UploadScreen from '../screens/upload-screen';
import { useNavigate } from 'react-router-dom';
import { UserProps } from '../../../interface';

const Home = () => {
  const navigate = useNavigate();
  React.useEffect(() => {
    const getUserFromLocalStorage = window.localStorage.getItem('user');
    const user: UserProps = JSON.parse(`${getUserFromLocalStorage}`);

    if (user !== null) {
      navigate('/dashboard');
    }
  }, [navigate]);

  return (
    <React.Fragment>
      <Navbar />
      <main
        className='w-full h-screen flex items-center justify-center bg-[rgb(255,255,255,0.1)] backdrop:blur-lg shadow-lg'
        // className='app transition-all ease-in overflow-y-auto'
      >
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
