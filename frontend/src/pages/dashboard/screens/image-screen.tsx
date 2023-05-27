// import React from 'react'

// interface Props {}
import { motion } from 'framer-motion';
import { headContainerAnimation } from '../../../utils/motion';
import {
  BsImageFill,
  BsPlayCircle,
  BsFillFileSpreadsheetFill,
  BsMusicNoteList,
} from 'react-icons/bs';

import { AiOutlineAppstoreAdd } from 'react-icons/ai';
import MediaCard from '../../../components/media-card';
import { useAppwriteContext } from '../../../context/app-write';

const ImageScreen = () => {
  const { globalDocumentData } = useAppwriteContext();
  // console.log('globalDocumentData', globalDocumentData);

  return (
    <motion.div
      {...headContainerAnimation}
      className='bg-gray-50 w-full h-full overflow-y-auto  p-3'
    >
      <motion.div className='flex flex-wrap gap-2'>
        <motion.div className='border-[1px] border-gray-300 w-fit h-fit gap-4'>
          <img
            className='w-40 h-30 object-cover object-center'
            src='https://plus.unsplash.com/premium_photo-1683639447442-164725904c84?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyfHx8ZW58MHx8fHx8&auto=format&fit=crop&w=500&q=60'
            alt=''
          />
        </motion.div>

        <motion.div className='bg-white border-[1px] border-gray-300 gap-4 w-40 h-30 inline-flex items-center justify-center'>
          <BsImageFill className='text-xl' />
        </motion.div>
        <motion.div className='border-[1px] border-gray-300 w-fit h-fit gap-4 relative'>
          <img
            className='w-40 h-30 object-cover object-center'
            src='https://plus.unsplash.com/premium_photo-1683639447442-164725904c84?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyfHx8ZW58MHx8fHx8&auto=format&fit=crop&w=500&q=60'
            alt=''
          />
          <BsPlayCircle className='p-5 text-4xl w-full h-full bg-black/20 text-white absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2' />
        </motion.div>
        <motion.div className='bg-white border-[1px] border-gray-300 gap-4 w-40 h-30 inline-flex items-center justify-center'>
          <BsFillFileSpreadsheetFill className='text-xl' />
        </motion.div>
        <motion.div className='bg-white border-[1px] border-gray-300 gap-4 w-40 h-30 inline-flex items-center justify-center'>
          <BsMusicNoteList className='text-xl' />
        </motion.div>
        <motion.div className='bg-white border-[1px] border-gray-300 gap-4 w-40 h-30 inline-flex items-center justify-center'>
          <AiOutlineAppstoreAdd className='text-xl' />
        </motion.div>
      </motion.div>
      {globalDocumentData?.map((data, index) => (
        <MediaCard
          data={data}
          key={index}
          extension={`${data?.mimeType?.split('/').shift()} ${data?.extension}`}
          value={''}
        />
      ))}
    </motion.div>
  );
};

export default ImageScreen;
