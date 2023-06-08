import { Tilt } from 'react-tilt';
import React from 'react';
import { Footer, Navbar, Tag } from '../../../components';
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

  const defaultOptions = {
    reverse: false, // reverse the tilt direction
    max: 35, // max tilt rotation (degrees)
    perspective: 1000, // Transform perspective, the lower the more extreme the tilt gets.
    scale: 1.1, // 2 = 200%, 1.5 = 150%, etc..
    speed: 1000, // Speed of the enter/exit transition
    transition: true, // Set a transition on enter/exit.
    axis: null, // What axis should be disabled. Can be X or Y.
    reset: true, // If the tilt effect has to be reset on exit.
    easing: 'cubic-bezier(.03,.98,.52,.99)', // Easing on enter/exit.
  };

  return (
    <React.Fragment>
      <Navbar />
      <main className='w-full h-full flex items-center justify-center bg-[rgb(255,255,255,0.1)] backdrop:blur-lg shadow-lg px-32'>
        <section className='w-full flex items-center justify-center'>
          {/* <div>
            <div>
              <p className='text-7xl font-bold'>one-stop access</p>
              <p className='text-5xl font-medium'>to your space</p>
            </div>
            <div className='flex flex-col'>
              <button className='bg-[rgb(255,255,255,0.4)] backdrop:blur-lg shadow-lg rounded-lg px-4 py-2 w-fit text-xl mt-2'>
                Get Started Today
              </button>
            </div>
          </div> */}
          <div className='p-10'>
            <Tilt options={defaultOptions}>
              <video
                src='/bg.mp4'
                className='rounded-lg shadow-lg'
                autoPlay={true}
                controls 
              />
            </Tilt>
          </div>
        </section>
        <Tag />
      </main>
      <Footer />
    </React.Fragment>
  );
};

export default Home;

{
  /* <span className='text-2xl'>Your Files, Boundless and Secure</span> */
}
