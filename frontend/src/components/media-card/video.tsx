// import React from 'react';
import { motion } from 'framer-motion';
import { BsPlayCircle } from 'react-icons/bs';

interface Props {
  value: string;
}

const VideoCard = (props: Props) => {
  return (
    <motion.div className='border-[1px] border-gray-300 gap-4 w-40 h-32 overflow-hidden relative'>
      <video
        className='w-full h-full'
        src={props.value}
        controls={false}
      />
      <BsPlayCircle className='p-5 text-4xl w-full h-full bg-black/20 text-white absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2' />
    </motion.div>
  );
};

export default VideoCard;
