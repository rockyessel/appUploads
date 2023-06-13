import { Tilt } from 'react-tilt';
import React from 'react';
import { Button, Navbar, Tag } from '../../../components';
import { useNavigate } from 'react-router-dom';
import { UserProps } from '../../../interface';
import { BsImage } from 'react-icons/bs';

const Home = () => {
  const navigate = useNavigate();
  React.useEffect(() => {
    const getUserFromLocalStorage = window.localStorage.getItem('appwrite_user');
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
      <main className='w-full h-full flex flex-col items-center justify-center bg-[rgb(255,255,255,0.1)]  gap-[10rem] backdrop:blur-lg shadow-lg px-32 pb-32'>
        <section className='w-full flex items-center justify-center mt-32'>
          <section className=''>
            <div className='grid max-w-screen-xl px-4 py-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12'>
              <div className='mr-auto place-self-center lg:col-span-7'>
                <h1 className='max-w-2xl mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-5xl xl:text-6xl dark:text-white'>
                  The visual Cloud you'll always want
                </h1>
                <p className='max-w-2xl mb-6 font-light text-gray-500 lg:mb-8 md:text-lg lg:text-xl dark:text-gray-400'>
                  DataNest is powered by AppWrite Cloud, that let's users store,
                  share, and organize files in a move productive way.
                </p>
                <a
                  href='#'
                  className='inline-flex items-center justify-center px-5 py-3 mr-3 text-base font-medium text-center text-white rounded-lg bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 dark:focus:ring-primary-900'
                >
                  Start with test
                  {/* <svg className="w-5 h-5 ml-2 -mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg> */}
                </a>
                <a
                  href='#'
                  className='inline-flex items-center justify-center px-5 py-3 text-base font-medium text-center text-gray-900 border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 dark:text-white dark:border-gray-700 dark:hover:bg-gray-700 dark:focus:ring-gray-800'
                >
                  Register account
                </a>
              </div>
              <div className='hidden lg:mt-0 lg:col-span-5 lg:flex relative'>
                {/* <img src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/hero/phone-mockup.png" alt="mockup" /> */}
                {/* <video src='/bgg.mp4' autoPlay={true} controls loop={true}></video> */}
                <img src='/r.png' alt='' />
                <div className='bg-[rgba(255,255,255,0.6)] absolute w-full backdrop-blur-md h-full'></div>
              </div>
            </div>
          </section>
        </section>

        <section className='w-full flex items-center justify-between gap-5 py-10 px-14 border-b-[1px] rounded-b-lg border-t-[1px] rounded-t-lg'>
          <p className='inline-flex items-center flex-col gap-2'>
            <span className='text-3xl xl:text-5xl font-medium'>169+</span>
            <span className='text-lg xl:text-xl flex-shrink-0'>
              Support Extension
            </span>
          </p>
          <p className='inline-flex items-center flex-col gap-2'>
            <span className='text-3xl xl:text-5xl font-medium'>342+</span>
            <span className='text-lg xl:text-xl flex-shrink-0'>
              Total Files
            </span>
          </p>
          <p className='inline-flex items-center flex-col gap-2'>
            <span className='text-3xl xl:text-5xl font-medium'>169GB</span>
            <span className='text-lg xl:text-xl flex-shrink-0'>
              Space Utilized
            </span>
          </p>
          <p className='inline-flex items-center flex-col gap-2'>
            <span className='text-3xl xl:text-5xl font-medium'>890+</span>
            <span className='text-lg xl:text-xl flex-shrink-0'>New users</span>
          </p>
        </section>
        {/* 
        <section>
          <p className='text-5xl font-medium text-center'>
            Upload as much as you want, and share them with friends, family and
            co-workers.
          </p>

          <div>
            <p>popular of the files extension we support are:</p>
      
          </div>
        </section> */}

        <section className='w-full flex flex-col gap-[10rem]'>
          <div className='flex flex-wrap items-center justify-between'>
            <div className='flex flex-col gap-5'>
              <p className='text-4xl font-bold'>Never-ending liquidity</p>
              <p className='max-w-2xl text-xl font-medium'>
                1inch instantly analyzes thousands of quotes and fees across
                multiple DEXes to provide users with the best rates.
              </p>
              <Button styles='w-fit' title=''>
                Sign up
              </Button>
            </div>
            <div className='bg-[rgba(255,255,255,0.4)] flex items-center justify-center px-4 py-6 rounded-lg w-[40rem]'>
              <Tilt options={defaultOptions}>
                <BsImage className='text-[10rem]' />
              </Tilt>
            </div>
          </div>
          <div className='flex flex-wrap items-center justify-between'>
            <div className='bg-[rgba(255,255,255,0.4)] flex items-center justify-center px-4 py-6 rounded-lg w-[40rem]'>
              <Tilt options={defaultOptions}>
                <BsImage className='text-[10rem]' />
              </Tilt>
            </div>
            <div className='flex flex-col gap-5'>
              <p className='text-4xl font-bold'>Never-ending liquidity</p>
              <p className='max-w-2xl text-xl font-medium'>
                1inch instantly analyzes thousands of quotes and fees across
                multiple DEXes to provide users with the best rates.
              </p>
              <Button styles='w-fit' title=''>
                Sign up
              </Button>
            </div>
          </div>
          <div className='flex flex-wrap items-center justify-between'>
            <div className='flex flex-col gap-5'>
              <p className='text-4xl font-bold'>Never-ending liquidity</p>
              <p className='max-w-2xl text-xl font-medium'>
                1inch instantly analyzes thousands of quotes and fees across
                multiple DEXes to provide users with the best rates.
              </p>
              <Button styles='w-fit' title=''>
                Sign up
              </Button>
            </div>
            <div className='bg-[rgba(255,255,255,0.4)] flex items-center justify-center px-4 py-6 rounded-lg w-[40rem]'>
              <Tilt options={defaultOptions}>
                <BsImage className='text-[10rem]' />
              </Tilt>
            </div>
          </div>
        </section>

        <section className='w-full relative flex items-center'>
          <p className='inline-flex flex-col gap-5 absolute left-16'>
            <span className='font-bold'>Banner for DataNest</span>
            <span className='max-w-lg text-lg font-medium'>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Necessitatibus placeat nostrum voluptatibus ipsa, ut incidunt ea
              id amet nobis nulla laudantium cumque autem ad beatae, expedita
              molestias praesentium temporibus saepe.
            </span>
            <Button styles='w-fit' title=''>
              Try now
            </Button>
          </p>
          <img className='w-full rounded-lg shadow-xl' src='/s.png' alt='' />
        </section>
        <Tag />
      </main>
      {/* <Footer /> */}
    </React.Fragment>
  );
};

export default Home;

{
  /* <span className='text-2xl'>Your Files, Boundless and Secure</span> */
}
//
