import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SideBar } from '../../components';
import { fadeAnimation } from '../../utils/motion';
import Navbar from './navbar';

interface Props {
  children: React.ReactNode;
}

const Layout = (props: Props) => {
  return (
    <React.Fragment>
      <Navbar />
      <motion.main className='transition-all ease-in'>
        <motion.section {...fadeAnimation} className=''>
          <motion.div className=''>
            <SideBar />
            <AnimatePresence>{props.children}</AnimatePresence>
          </motion.div>
        </motion.section>
      </motion.main>
    </React.Fragment>
  );
};

export default Layout;
