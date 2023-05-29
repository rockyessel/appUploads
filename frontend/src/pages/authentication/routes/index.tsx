import React from 'react';
import RegisterScreen from '../screens/register-screen';
import LoginScreen from '../screens/login-screen';
import { Footer, Navbar, Tag } from '../../../components';
import { UserProps } from '../../../interface';
import { useNavigate } from 'react-router-dom';

const Authentication = () => {
  const navigate = useNavigate();
  React.useEffect(() => {
    const getUserFromLocalStorage = window.localStorage.getItem('user');
    const user: UserProps = JSON.parse(`${getUserFromLocalStorage}`);

    console.log('user', user);

    if (user !== null) {
      navigate('/dashboard');
    }
  }, [navigate]);

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
