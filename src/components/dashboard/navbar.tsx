import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Logo from '../logo';
import { BsSun, BsMoon } from 'react-icons/bs';
import { slideAnimation } from '../../utils/motion';
import { UserProps } from '../../interface';
import { TbArrowBarLeft } from 'react-icons/tb';
import { AiOutlineSearch } from 'react-icons/ai';
import { useThemeContext } from '../../context/theme';

interface Props {
  setHideMenu: React.Dispatch<React.SetStateAction<boolean>>;
}

const Navbar = (props: Props) => {
  const [user, setUser] = React.useState<UserProps>();
  const { handleThemeSwitch } = useThemeContext();

  React.useEffect(() => {
    const userInfo = window.localStorage.getItem('appwrite_user');
    const parseUserInfo = userInfo ? JSON.parse(userInfo) : {};
    setUser(parseUserInfo);
  }, []);

  return (
    <motion.header
      {...slideAnimation('down')}
      className={`bg-[rgb(255,255,255,0.2)]  backdrop-blur-lg border-b-[1px] w-full py-2 px-5`}
    >
      <motion.nav className='w-full h-full m-0 p-0 flex justify-between'>
        <Logo />

        <motion.ul className='flex items-center gap-5 font-medium'>
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

          {user?.status ? (
            <Link className='hidden sm:block' to='/dashboard'>
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
          <Link to='/dashboard/search'>
            <motion.li className='hover:bg-black inline-flex items-center gap-1 text-gray-50/60 rounded-lg px-3 py-1.5 cursor-pointer hover:ring-2 hover:ring-gray-300 active:ring-4 active:ring-gray-400'>
              <AiOutlineSearch className='text-2xl' />
              <span className='hidden sm:block'>Search</span>
            </motion.li>
          </Link>

          <span
            onClick={() => props.setHideMenu((prev) => !prev)}
            className='hover:bg-black inline-flex items-center gap-1 text-white dark:text-rose-500 p-1 rounded-lg bg-black z-[100]'
          >
            <TbArrowBarLeft className='text-xl' />
          </span>
        </motion.ul>
      </motion.nav>
    </motion.header>
  );
};

export default Navbar;
