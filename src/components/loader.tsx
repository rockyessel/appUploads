// import React from 'react'

import { ImSpinner9 } from 'react-icons/im';
import Logo from '../assets/dnest.svg';

interface Props {
    message:string
}

const Loader = (props: Props) => {
  return (
    <div className='w-full h-full flex flex-col items-center justify-center bg-[rgba(255,255,255,0.1)] backdrop-blur-lg rounded-lg'>
      <span className='inline-flex items-center'>
        <img className='animate-bounce w-20' src={Logo} alt='' />
        <ImSpinner9 className='animate-spin text-4xl' />
        <img className='animate-bounce w-20' src={Logo} alt='' />
      </span>
          <p className='text-xl'>{props.message}</p>
    </div>
  );
};

export default Loader;
