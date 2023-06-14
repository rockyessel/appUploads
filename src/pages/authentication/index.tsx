import React from 'react';
import { Footer, Navbar, Tag } from '../../components';
import { UserProps } from '../../interface';
import { useNavigate } from 'react-router-dom';
import RegisterScreen from '../screens/auth/register-screen';
import { LoginScreen } from '../screens';

const Authentication = () => {
  const navigate = useNavigate(); // Hook for navigating to different routes

  React.useEffect(() => {
    const getUserFromLocalStorage =
      window.localStorage.getItem('appwrite_user'); // Retrieve user data from localStorage
    const user: UserProps = JSON.parse(`${getUserFromLocalStorage}`); // Parse the retrieved data into a UserProps object

    console.log('user', user); // Log the user object to the console

    if (user !== null) {
      navigate('/dashboard'); // If a user exists, navigate to the '/dashboard' route
    }
  }, [navigate]); // Run this effect whenever the navigate function changes

  return (
    <React.Fragment>
      <Navbar />
      <main className=''>
        <RegisterScreen />
        <LoginScreen />
        <Tag />
      </main>
      <Footer />
    </React.Fragment>
  );
};

export default Authentication;
