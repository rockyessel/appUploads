// import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Logo from '../logo';
import { BsSun, BsMoon } from 'react-icons/bs';
import { slideAnimation } from '../../utils/motion';

const Navbar = () => {
  const user = true;
  return (
    <motion.header
      {...slideAnimation('down')}
      className={`bg-gray-50 border-[1px] w-full py-2 px-5`}>
      <motion.nav className='w-full h-full m-0 p-0 flex justify-between'>
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
            <label className='swap swap-rotate rounded-full p-1'>
              <input title='Mode Toggle' type='checkbox' />
              <BsSun className='swap-on fill-current text-xl' />
              <BsMoon className='swap-off fill-current text-xl' />
            </label>
          </motion.li>
        </motion.ul>
      </motion.nav>
    </motion.header>
  );
};

export default Navbar;
