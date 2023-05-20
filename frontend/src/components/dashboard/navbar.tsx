// import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Logo from '../logo';


const Navbar = () => {
  return (
    <motion.header className={`bg-gray-50 border-[1px] w-full py-2 px-5`}>
      <motion.nav className='w-full h-full m-0 p-0 flex justify-between'>
        <Logo size='text-2xl' />
        <motion.ul className='flex items-center gap-5 font-medium'>
          <Link to='/authenticate'>
            <motion.li className='hover:bg-white rounded-lg px-3 py-1.5 cursor-pointer hover:ring-2 hover:ring-gray-300 active:ring-4 active:ring-gray-400'>
              Authenticate
            </motion.li>
          </Link>
        </motion.ul>
      </motion.nav>
    </motion.header>
  );
};

export default Navbar;
