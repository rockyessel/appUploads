// import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Logo from './logo';
import { BsSun, BsMoon } from 'react-icons/bs';

const Navbar = () => {
  const user = false;
  return (
    <motion.header className={`bg-gray-50 border-[1px] fixed w-full py-2 px-5 z-[100]`}>
      <motion.nav className='w-full h-full m-0 p-0 flex items-center justify-between'>
        <Logo size='text-2xl' />

        <motion.ul className='flex items-center gap-5 font-medium'>
          {user ? (
            <motion.li className='hover:bg-white rounded-lg px-3 py-1.5 cursor-pointer hover:ring-2 hover:ring-gray-300 active:ring-4 active:ring-gray-400'>
              Profile
            </motion.li>
          ) : (
            <Link to='/authenticate'>
              <motion.li className='hover:bg-white rounded-lg px-3 py-1.5 cursor-pointer hover:ring-2 hover:ring-gray-300 active:ring-4 active:ring-gray-400'>
                Authenticate
              </motion.li>
            </Link>
          )}

          <motion.li className='hover:bg-white rounded-lg px-3 py-1.5 cursor-pointer hover:ring-2 hover:ring-gray-300 active:ring-4 active:ring-gray-400'>
            <label className='swap swap-rotate border-[1px] border-gray-50/60 rounded-full p-2'>
              <input title='Mode Toggle' type='checkbox' />
              <BsSun className='swap-on fill-current w-6 h-6' />
              <BsMoon className='swap-off fill-current w-6 h-6' />
            </label>
          </motion.li>
        </motion.ul>
      </motion.nav>
    </motion.header>
  );
};

export default Navbar;
