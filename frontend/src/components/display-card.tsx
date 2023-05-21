// import React from 'react'
import { motion } from 'framer-motion';

interface Props {
  extension: string;
  value: string;
}

const DisplayCard = (props: Props) => {
  switch (props.extension) {
    case 'svg':
      return (
        <motion.div className='w-full bg-gray-50 h-[20rem] overflow-hidden rounded-lg flex items-center px-10 border-[1px]'>
          <span
            className='w-full'
            dangerouslySetInnerHTML={{ __html: props?.value }}
          ></span>
        </motion.div>
      );

    case 'mp4':
      return (
        <motion.div className='w-full h-[20rem] overflow-hidden rounded-lg flex items-center border-[1px]'>
          <video src={props?.value} />
        </motion.div>
      );

    case 'html':
      return (
        <motion.div className='w-full h-[20rem] overflow-hidden rounded-lg flex items-center px-10 border-[1px]'>
          <video src={props?.value} />
        </motion.div>
      );

    default:
      return (
        <motion.div className='w-full h-[20rem] overflow-hidden rounded-lg flex items-center border-[1px]'>
          <img
            className='w-full h-full object-cover object-center'
            src={props.value}
            alt=''
          />
        </motion.div>
      );
  }
};

export default DisplayCard;
