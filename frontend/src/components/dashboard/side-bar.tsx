// import React from 'react'
import { motion, AnimatePresence } from 'framer-motion';
import {
  GrMusic,
  GrVideo,
  GrImage,
  GrDocumentVerified,
  GrSettingsOption,
} from 'react-icons/gr';
import { GiArtificialHive } from 'react-icons/gi';
import { MdOutlineSettings, MdLogout } from 'react-icons/md';
import { TbArrowBarLeft } from 'react-icons/tb';

const SideBar = () => {
  return (
    <AnimatePresence>
      <motion.section className='relative w-[80px] md:w-[280px] flex flex-col justify-between min-h-[94vh] border-r-[1px] bg-gray-50 z-[100] p-2 md:p-5'>
        <span className='md:hidden fixed left-[66px] bg-gray-500 text-white p-1 rounded-md'>
          <TbArrowBarLeft className='text-xl'/>
        </span>
        <motion.ul className='w-full flex flex-col justify-center gap-4'>
          <motion.li className='hover:bg-white text-center rounded-lg px-3 py-1.5 cursor-pointer hover:ring-2 hover:ring-gray-300 active:ring-4 active:ring-gray-400 inline-flex items-center gap-1'>
            <GrMusic className='text-xl' />
            <span className='hidden md:block'>Music</span>
          </motion.li>
          <motion.li className='hover:bg-white rounded-lg px-3 py-1.5 cursor-pointer hover:ring-2 hover:ring-gray-300 active:ring-4 active:ring-gray-400 inline-flex items-center gap-1'>
            <GrVideo className='text-xl' />
            <span className='hidden md:block'>Videos</span>
          </motion.li>
          <motion.li className='hover:bg-white rounded-lg px-3 py-1.5 cursor-pointer hover:ring-2 hover:ring-gray-300 active:ring-4 active:ring-gray-400 inline-flex items-center gap-1'>
            <GrImage className='text-xl' />
            <span className='hidden md:block'>Images</span>
          </motion.li>
          <motion.li className='hover:bg-white rounded-lg px-3 py-1.5 cursor-pointer hover:ring-2 hover:ring-gray-300 active:ring-4 active:ring-gray-400 inline-flex items-center gap-1'>
            <GrDocumentVerified className='text-xl' />
            <span className='hidden md:block'>Documents</span>
          </motion.li>
          <motion.li className='hover:bg-white rounded-lg px-3 py-1.5 cursor-pointer hover:ring-2 hover:ring-gray-300 active:ring-4 active:ring-gray-400 inline-flex items-center gap-1'>
            <GrSettingsOption className='text-xl' />
            <span className='hidden md:block'>Applications</span>
          </motion.li>
          <motion.li className='hover:bg-white rounded-lg px-3 py-1.5 cursor-pointer hover:ring-2 hover:ring-gray-300 active:ring-4 active:ring-gray-400 inline-flex items-center gap-1'>
            <GiArtificialHive className='text-xl' />
            <span className='hidden md:block'>Generative Image</span>
          </motion.li>
        </motion.ul>
        <motion.ul className='w-full flex flex-col justify-center gap-4'>
          <motion.li className='hover:bg-white rounded-lg px-3 py-1.5 cursor-pointer hover:ring-2 hover:ring-gray-300 active:ring-4 active:ring-gray-400 inline-flex items-center gap-1'>
            <MdOutlineSettings className='text-xl' />
            <span className='hidden md:block'>Settings</span>
          </motion.li>
          <motion.li className='hover:bg-white rounded-lg px-3 py-1.5 cursor-pointer hover:ring-2 hover:ring-gray-300 active:ring-4 active:ring-gray-400 inline-flex items-center gap-1'>
            <MdLogout className='text-xl' />
            <span className='hidden md:block'>Logout</span>
          </motion.li>
        </motion.ul>
      </motion.section>
    </AnimatePresence>
  );
};

export default SideBar;
