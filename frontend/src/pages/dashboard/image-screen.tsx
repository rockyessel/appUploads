// import React from 'react'

// interface Props {}

import {
  BsImageFill,
  BsPlayCircle,
  BsFillFileSpreadsheetFill,
  BsMusicNoteList,
} from 'react-icons/bs';

import { AiOutlineAppstoreAdd } from 'react-icons/ai';

const ImageScreen = () => {
  return (
    <div className='bg-gray-50 w-full h-full overflow-y-auto  p-3'>
      <div className='flex flex-wrap gap-2'>
        <div className='border-[1px] border-gray-300 w-fit h-fit gap-4'>
          <img
            className='w-40 h-30 object-cover object-center'
            src='https://plus.unsplash.com/premium_photo-1683639447442-164725904c84?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyfHx8ZW58MHx8fHx8&auto=format&fit=crop&w=500&q=60'
            alt=''
          />
        </div>

        <div className='bg-white border-[1px] border-gray-300 gap-4 w-40 h-30 inline-flex items-center justify-center'>
          <BsImageFill className='text-xl' />
        </div>
        <div className='border-[1px] border-gray-300 w-fit h-fit gap-4 relative'>
          <img
            className='w-40 h-30 object-cover object-center'
            src='https://plus.unsplash.com/premium_photo-1683639447442-164725904c84?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyfHx8ZW58MHx8fHx8&auto=format&fit=crop&w=500&q=60'
            alt=''
          />
          <BsPlayCircle className='p-5 text-4xl w-full h-full bg-black/20 text-white absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2' />
        </div>
        <div className='bg-white border-[1px] border-gray-300 gap-4 w-40 h-30 inline-flex items-center justify-center'>
          <BsFillFileSpreadsheetFill className='text-xl' />
        </div>
        <div className='bg-white border-[1px] border-gray-300 gap-4 w-40 h-30 inline-flex items-center justify-center'>
          <BsMusicNoteList className='text-xl' />
        </div>
        <div className='bg-white border-[1px] border-gray-300 gap-4 w-40 h-30 inline-flex items-center justify-center'>
          <AiOutlineAppstoreAdd className='text-xl' />
        </div>
      </div>
    </div>
  );
};

export default ImageScreen;
