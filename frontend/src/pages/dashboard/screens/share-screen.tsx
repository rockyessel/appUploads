// import React from 'react';
import { motion } from 'framer-motion';
import { fadeAnimation } from '../../../utils/motion';

const ShareScreen = () => {
  return (
    <motion.div
      {...fadeAnimation}
      className='bg-transparent w-full h-full overflow-y-auto p-3 '
    >
      <motion.div className='w-full flex flex-col items-center justify-center p-5'>
       
      </motion.div>
    </motion.div>
  );
};

export default ShareScreen;
