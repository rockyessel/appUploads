import { motion, AnimatePresence } from 'framer-motion';
import { slideAnimation } from '../utils/motion';

const Tag = () => {
  return (
    <AnimatePresence>
      <motion.section
        {...slideAnimation('right')}
        className='fixed flex flex-col items-center justify-center group bottom-10 right-10 border-red-500 border-2 rounded-lg w-fit p-3 hover:cursor-pointer hover:bg-transparent hover:shadow-md z-[100]'
      >
        <motion.span className='relative flex'>
          <img
            src='/appwrite.svg'
            className='w-40 group-hover:animate-ping absolute inline-flex opacity-75'
            alt='appwrite'
          />
          <img src='/appwrite.svg' className='w-40' alt='appwrite' />
        </motion.span>
        <motion.p>
          Storage powered by{' '}
          <motion.a
            rel='noopener'
            target='_blank'
            href='https://appwrite.io/?ref=appwriuploads'
          >
            <motion.span className='text-red-500'>
              app<motion.span className='font-bold'>write</motion.span>
            </motion.span>
          </motion.a>
        </motion.p>
      </motion.section>
    </AnimatePresence>
  );
};

export default Tag;
