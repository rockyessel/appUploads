import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MdOutlineSettings, MdLogout } from 'react-icons/md';
import { TbArrowBarLeft } from 'react-icons/tb';
import { useAppwriteContext } from '../../context/app-write';
import { useNavigate, useLocation } from 'react-router-dom';
import { slideAnimation } from '../../utils/motion';
import { handleScreenChange } from '../../utils/functions';
import { toast } from 'react-toastify';
import {
  sidebarMenuCategoriesItems,
  sidebarMenuAppItems,
} from '../../utils/constant';

const SideBar = () => {
  const { logout } = useAppwriteContext();
  const [loading, setLoading] = React.useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = async () => {
    setLoading(true);
    await logout();
    setLoading(false);
    if (location.pathname === '/dashboard') navigate('/authenticate');
  };

  React.useEffect(() => {
    if (loading) {
      toast.info('Logging out...');
    }
  }, [loading]);

  return (
    <AnimatePresence>
      <motion.section
        {...slideAnimation('left')}
        className='relative w-[80px] md:w-[280px] flex flex-col justify-between min-h-[94vh] border-r-[1px] bg-[rgb(255,255,255,0.1)]  backdrop-blur-md z-[100] p-2 md:p-5'
      >
        <span className='md:hidden fixed left-[66px] bg-transparent-500 text-white p-1 rounded-md'>
          <TbArrowBarLeft className='text-xl' />
        </span>
        <div className='flex flex-col gap-2'>
          <div className='flex flex-col gap-1'>
            <p className='text-xl font-bold text-gray-600/70'>Apps</p>

            <motion.ul className='w-full flex flex-col justify-center gap-1'>
              {sidebarMenuAppItems.map((item, index) => (
                <motion.li
                  key={index}
                  className='text-center p-2 hover:bg-[rgb(255,255,255,0.2)] group rounded-lg text-[1.1rem] cursor-pointer inline-flex items-center gap-1'
                  onClick={() => {
                    navigate(`/dashboard/${item.name}`);
                  }}
                >
                  <span className='p-1 rounded-lg bg-[rgb(255,255,255,0.2)] group-hover:bg-[rgb(255,255,255,0.1)] group-hover:backdrop-blur-sm backdrop-blur-md z-[100] w-8 h-8 inline-flex items-center justify-center'>
                    {item.icon}
                  </span>
                  <span className='hidden md:block'>{item.title}</span>
                </motion.li>
              ))}
            </motion.ul>
          </div>
          <div className='flex flex-col gap-1'>
            <p className='text-xl font-bold text-gray-600/70'>Categories</p>
            <motion.ul className='w-full flex flex-col justify-center gap-1'>
              {sidebarMenuCategoriesItems.map((item, index) => (
                <motion.li
                  className='text-center p-2 hover:bg-[rgb(255,255,255,0.2)] group rounded-lg text-[1.1rem] cursor-pointer inline-flex items-center gap-1'
                  key={index}
                  onClick={() => {
                    navigate(`/dashboard/${item.name}`);
                  }}
                >
                  <span className='p-1 rounded-lg bg-[rgb(255,255,255,0.2)] group-hover:bg-[rgb(255,255,255,0.1)] group-hover:backdrop-blur-sm backdrop-blur-md z-[100] w-8 h-8 inline-flex items-center justify-center'>
                    {item.icon}
                  </span>
                  <span className='hidden md:block'>{item.title}</span>
                </motion.li>
              ))}
            </motion.ul>
          </div>
        </div>
        <motion.ul className='w-full flex flex-col justify-center gap-4'>
          <motion.li
            onClick={() => {
              handleScreenChange('settings');
              navigate('/dashboard');
            }}
            className='hover:bg-white rounded-lg bg-[rgb(255,255,255,0.2)] p-4 backdrop-blur-lg cursor-pointer hover:ring-2 hover:ring-gray-300 active:ring-4 active:ring-gray-400 inline-flex items-center gap-1'
          >
            <MdOutlineSettings className='text-xl' />
            <span className='hidden md:block'>Settings</span>
          </motion.li>
          <motion.li
            onClick={handleLogout}
            className='hover:bg-white rounded-lg bg-[rgb(255,255,255,0.2)] p-4 backdrop-blur-lg cursor-pointer hover:ring-2 hover:ring-gray-300 active:ring-4 active:ring-gray-400 inline-flex items-center gap-1'
          >
            <MdLogout className='text-xl' />
            <span className='hidden md:block'>Logout</span>
          </motion.li>
        </motion.ul>
      </motion.section>
    </AnimatePresence>
  );
};

export default SideBar;
