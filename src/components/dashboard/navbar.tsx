import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Logo from '../logo';
import { BsSun, BsMoon } from 'react-icons/bs';
import { slideAnimation } from '../../utils/motion';
import { UserProps } from '../../interface';
import { TbArrowBarLeft } from 'react-icons/tb';
import { useAppwriteContext } from '../../context/app-write';
import { useThemeContext } from '../../context/theme';
import {AiOutlineSearch} from 'react-icons/ai'

interface Props {
  setHideMenu: React.Dispatch<React.SetStateAction<boolean>>;
}

const Navbar = (props: Props) => {
  const [user, setUser] = React.useState<UserProps>();
  const [loading, setLoading] = React.useState(false);
  // const [error, setError] = React.useState(false);
  const { getUser } = useAppwriteContext();
  const { handleThemeSwitch } = useThemeContext();

  React.useEffect(() => {
    getUser().then((data) => {
      setUser(data);
      setLoading(false);
    });
  }, [getUser]);

  return (
    <motion.header
      {...slideAnimation('down')}
      className={`bg-[rgb(255,255,255,0.2)]  backdrop-blur-lg border-b-[1px] w-full py-2 px-5`}
    >
      <motion.nav className='w-full h-full m-0 p-0 flex justify-between'>
        <Logo size='text-2xl hidden md:block' />

        <motion.ul className='flex items-center gap-5 font-medium'>
          <motion.li className='hover:bg-black text-gray-50/60 rounded-lg px-3 py-1.5 cursor-pointer hover:ring-2 hover:ring-gray-300 active:ring-4 active:ring-gray-400'>
            <label className='swap swap-rotate rounded-full p-1'>
              <input title='Mode Toggle' type='checkbox' />
              <BsSun
                onClick={handleThemeSwitch}
                className='swap-on fill-current text-xl'
              />
              <BsMoon
                onClick={handleThemeSwitch}
                className='swap-off fill-current text-xl'
              />
            </label>
          </motion.li>

          {loading ? (
            <p>Loading</p>
          ) : user ? (
            <Link to='/dashboard'>
              <motion.li className='hover:bg-black rounded-lg px-3 py-1.5 cursor-pointer hover:ring-2 hover:ring-gray-300 active:ring-4 active:ring-gray-400'>
                Profile
              </motion.li>
            </Link>
          ) : (
            <Link to='/authenticate'>
              <motion.li className='hover:bg-black text-gray-50/90 rounded-lg px-3 py-1.5 cursor-pointer hover:ring-2 hover:ring-gray-300 active:ring-4 active:ring-gray-400'>
                Authenticate
              </motion.li>
            </Link>
          )}
          <Link to='/dashboard/search'>
            
          <motion.li className='hover:bg-black inline-flex items-center gap-1 text-gray-50/60 rounded-lg px-3 py-1.5 cursor-pointer hover:ring-2 hover:ring-gray-300 active:ring-4 active:ring-gray-400'>
            <AiOutlineSearch className='text-2xl' />
            Search
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
