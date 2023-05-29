// import React from 'react'
import { motion } from 'framer-motion';
import { fadeAnimation } from '../../../utils/motion';
import { AiOutlineAppstoreAdd } from 'react-icons/ai';
// interface Props {}

const ApplicationScreen = () => {
  return (
    <motion.div
      {...fadeAnimation}
      className='bg-gray-50 w-full h-full overflow-y-auto p-3'
    >
      <motion.div className='bg-white border-[1px] border-gray-300 gap-4 w-40 h-32 inline-flex items-center justify-center'>
        <AiOutlineAppstoreAdd className='text-xl' />
      </motion.div>
    </motion.div>
  );
};

export default ApplicationScreen;
