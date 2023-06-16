import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Logo from './logo';
import { BsSun, BsMoon } from 'react-icons/bs';
import { slideAnimation } from '../utils/motion';
import { UserProps } from '../interface';
import { useThemeContext } from '../context/theme';

const Navbar = () => {
  const [user, setUser] = React.useState<UserProps>();
  const { handleThemeSwitch } = useThemeContext();

  React.useEffect(() => {
    const userInfo = window.localStorage.getItem('appwrite_user');
    const parseUserInfo = userInfo ? JSON.parse(userInfo) : {};
    setUser(parseUserInfo);
  }, []);

  return (
    <motion.header
      className={`bg-[rgb(255,255,255,0.4)]  backdrop-blur-md border-[1px] fixed w-full py-2 px-5 z-[100]`}
      {...slideAnimation('down')}
    >
      <motion.nav className='w-full h-full m-0 p-0 flex items-center justify-between'>
        <Logo />

        <motion.ul className='flex items-center gap-5 font-medium'>
          {user?.status ? (
            <Link to='/dashboard'>
              <motion.li className='hover:bg-white rounded-lg px-3 py-1.5 cursor-pointer hover:ring-2 hover:ring-gray-300 active:ring-4 active:ring-gray-400'>
                Profile
              </motion.li>
            </Link>
          ) : (
            <Link to='/authenticate'>
              <motion.li className='hover:bg-white rounded-lg px-3 py-1.5 cursor-pointer hover:ring-2 hover:ring-gray-300 active:ring-4 active:ring-gray-400'>
                Authenticate
              </motion.li>
            </Link>
          )}

          <motion.li className='hover:bg-black text-gray-50/60 rounded-lg px-3 py-1.5 cursor-pointer hover:ring-2 hover:ring-gray-300 active:ring-4 active:ring-gray-400'>
            <label className='swap swap-rotate rounded-full p-1'>
              <input title='Mode Toggle' type='checkbox' />
              <BsMoon
                onClick={handleThemeSwitch}
                className='swap-off fill-current text-xl'
              />
              <BsSun
                onClick={handleThemeSwitch}
                className='swap-on fill-current text-xl'
              />
            </label>
          </motion.li>
          <Link to='/access'>
            <motion.li className='hover:bg-white rounded-lg px-3 py-1.5 cursor-pointer hover:ring-2 hover:ring-gray-300 active:ring-4 active:ring-gray-400'>
              Access
            </motion.li>
          </Link>
        </motion.ul>
      </motion.nav>
    </motion.header>
  );
};

export default Navbar;
