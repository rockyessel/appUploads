import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SideBar } from '../../components';
import { fadeAnimation } from '../../utils/motion';
import Navbar from './navbar';
import DashboardFooter from './footer';

interface Props {
  children: React.ReactNode;
}

const Layout = (props: Props) => {
  return (
    <React.Fragment>
      <motion.main className='w-full h-full transition-all ease-in overflow-hidden'>
        <Navbar />
        <motion.section {...fadeAnimation} className=''>
          <motion.div className='w-full h-full flex'>
            <div className='w-280px'>
              <SideBar />
            </div>
            <div className='w-full h-[94vh] flex-1 relative'>
              <AnimatePresence>{props.children}</AnimatePresence>
              <DashboardFooter />
            </div>
          </motion.div>
        </motion.section>
      </motion.main>
    </React.Fragment>
  );
};

export default Layout;
