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
  
  const [hideMenu, setHideMenu] = React.useState(true);
  return (
    <React.Fragment>
      <motion.main className='w-full h-full transition-all ease-in overflow-hidden'>
        <Navbar setHideMenu={setHideMenu} />
        <motion.section {...fadeAnimation} className=' overflow-hidden'>
          <motion.div className='w-full h-full flex'>
            <div className='w-280px'>
              <SideBar hideMenu={hideMenu} />
            </div>
            <div className='w-full h-[94vh] overflow-y-auto flex-1 relative'>
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
