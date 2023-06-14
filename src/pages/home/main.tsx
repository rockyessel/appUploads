import { Tilt } from 'react-tilt';
import React from 'react';
import { Button, Navbar } from '../../components';
import { BsImage } from 'react-icons/bs';
import Head from '../../components/head';

const Home = () => {
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
      <Head
        MIME='png'
        alt='Homepage - Dnest'
        author_name='Rocky Essel'
        description='Welcome to our Cloud File Storage!'
        image=''
        keywords='Cloud file, file storage, storage, online cloud, file sharing'
        publishedAt={new Date().toISOString()}
        title='Dnest Homepage'
        type='Website'
        updatedAt={new Date().toISOString()}
      />
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
      </main>
      {/* <Footer /> */}
    </React.Fragment>
  );
};

export default Home;
