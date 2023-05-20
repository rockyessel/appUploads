import React from 'react';
import RegisterScreen from './register-screen';
import LoginScreen from './login-screen';
import { Footer, Navbar, Tag } from '../../components';

const Authentication = () => {
  return (
    <React.Fragment>
      <Navbar />
      <main className='app transition-all ease-in'>
        <RegisterScreen />
        <LoginScreen />
        <Tag />
      </main>
      <Footer />
    </React.Fragment>
  );
};

export default Authentication;
