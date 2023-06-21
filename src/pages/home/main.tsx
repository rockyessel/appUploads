import React from 'react';
import { Navbar } from '../../components';
import Head from '../../components/head';

const Home = () => {
 
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
      <main className='w-full h-screen flex flex-col items-center justify-center bg-[rgba(255,255,255,0.1)] gap-[10rem] backdrop:blur-lg shadow-lg md:px-32 pb-32'>
        <section className='w-full flex flex-col items-center justify-center'>
          <div className='max-w-screen-xl px-4 py-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12'>
            <div className='mr-auto place-self-center lg:col-span-7'>
              <h1 className='max-w-2xl mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-5xl xl:text-6xl dark:text-white'>
                The visual Cloud you'll always want
              </h1>
              <p className='max-w-2xl mb-6 font-light text-gray-500 lg:mb-8 md:text-lg lg:text-xl dark:text-gray-400'>
                DataNest is powered by AppWrite Cloud, that let's users store,
                share, and organize files in a move productive way.
              </p>
              <a
                href='https://github.com/rockyessel/dnest'
                className='inline-flex items-center justify-center px-5 py-3 mr-3 text-base font-medium text-center text-white rounded-lg bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 dark:focus:ring-primary-900'
              >
                Github
              </a>
              <a
                href='https://www.youtube.com/watch?v=eWpfgZ6G3go&list=PLsFqazYEINpRTqJtYLiII9jicJ6_PT56z'
                className='inline-flex items-center justify-center px-5 py-3 text-base font-medium text-center text-gray-900 border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 dark:text-white dark:border-gray-700 dark:hover:bg-gray-700 dark:focus:ring-gray-800'
              >
                Watch Demo
              </a>
            </div>
           
          </div>
        </section>

        <section className='fixed bottom-0 left-0 z-20 w-full p-4 border-t border-gray-200 shadow md:flex md:items-center md:justify-between md:p-6'>
          <div className='w-full flex flex-wrap items-center justify-center gap-10'>
            <img className='w-10 md:w-20' src='/appwrite_.svg' alt='' />
            <img className='w-10 md:w-20' src='/reactjs.png' alt='' />
            <img className='w-10 md:w-20' src='/typescript.png' alt='' />
            <img className='w-10 md:w-20' src='/tailwind.png' alt='' />
          </div>
        </section>
      </main>
    </React.Fragment>
  );
};

export default Home;
