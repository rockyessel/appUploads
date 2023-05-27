import React from 'react';
import { motion } from 'framer-motion';

const ImageCard = (props) => {
  return (
    <motion.div className='w-full h-[20rem] overflow-hidden rounded-lg flex items-center border-[1px]'>
      <img
        className='w-full h-full object-cover object-center'
        src={props.value}
        alt=''
      />
    </motion.div>
  );
};

export default ImageCard;
