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
      <motion.main className='w-full h-full transition-all ease-in overflow-hidden'>
        <Navbar />
        <motion.section {...fadeAnimation} className=''>
          <motion.div className='w-full h-full flex'>
            <div className='w-280px'>
              <SideBar />
            </div>
            <div className='w-full h-[94vh] flex-1 relative'>
              <AnimatePresence>{props.children}</AnimatePresence>
              <div className='px-3 text-sm inline-flex items-center text-gray-50/60 gap-10 bottom-0 border-t-[1px] bg-[rgb(255,255,255,0.2)]  backdrop-blur-md sticky w-full h-10'>
                <span>Wednesday, 31st May 2023</span>
                <span>Time: 4:42 AM </span>
                <span> Section: Music</span>
                <span> Total file: 32</span>
                <span> Total size: 1 GB</span>
                <div className='form-control w-52'>
                  <label className='cursor-pointer label'>
                    <span className='text-white'>Remember me</span>
                    <input
                      type='checkbox'
                      className='toggle toggle-accent'
                    />
                  </label>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.section>
      </motion.main>
    </React.Fragment>
  );
};

export default Layout;
