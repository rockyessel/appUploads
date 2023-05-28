// import React from 'react';
import { motion } from 'framer-motion';

interface Props {
  value: string;
}

const ImageCard = (props: Props) => {
  return (
    <motion.div className='border-[1px] border-gray-300 gap-4 w-40 h-32 overflow-hidden'>
      <img
        className='w-full h-full object-cover object-center'
        src={props?.value}
        alt=''
      />
    </motion.div>
  );
};

export default ImageCard;
