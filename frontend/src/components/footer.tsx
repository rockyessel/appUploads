import { motion } from 'framer-motion';

const footer = () => {
  return (
    <motion.footer className='w-full absolute bottom-10 items-center justify-center z-[100]'>
      <motion.ul className='text-sm font-medium flex items-center justify-center gap-5'>
        <motion.li>Help</motion.li>
        <motion.li>Terms</motion.li>
        <motion.li>Report Abuse</motion.li>
      </motion.ul>
    </motion.footer>
  );
};

export default footer;
