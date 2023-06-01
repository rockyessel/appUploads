import { AnimatePresence, motion } from 'framer-motion';
import React from 'react';
import { FaCopy } from 'react-icons/fa';

interface Props {
  children: React.ReactNode;
}

const TabContentCard = (props: Props) => {
  return (
    <AnimatePresence>
      <motion.div className='w-full h-24 overflow-y-auto border-[1px] relative bg-black px-5 py-4 rounded-lg text-gray-50/70'>
        <motion.pre className='overflow-x-auto flex flex-col'>
          {props.children}
        </motion.pre>
        <FaCopy className='absolute top-3 z-[6] right-3 shadow-lg shadow-black' />
      </motion.div>
    </AnimatePresence>
  );
};

export default TabContentCard;
