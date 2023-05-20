import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSnapshot } from 'valtio';
import { screenState } from '../../utils/state';
import { slideAnimation } from '../../utils/motion';
import { FaCopy } from 'react-icons/fa';
import { AiOutlineUpload, AiOutlinePlus } from 'react-icons/ai';
import { GiTimeDynamite } from 'react-icons/gi';
import { Link } from 'react-router-dom';

const FileScreen = () => {
  const [selectActiveTab, setSelectActiveTab] = React.useState('link');
  const snap = useSnapshot(screenState);

  const RenderActiveTab = () => {
    switch (selectActiveTab) {
      case 'link':
        return (
          <AnimatePresence>
            <motion.div className='w-full border-[1px] relative bg-black px-5 py-4 rounded-lg text-gray-50/70'>
              <motion.pre className='overflow-x-auto'>
                <motion.code>https://imgbox.com/ibO9WDCc</motion.code>
              </motion.pre>
              <FaCopy className='absolute top-3 z-[6] right-3 shadow-lg shadow-black' />
            </motion.div>
          </AnimatePresence>
        );
      case 'html-code':
        return (
          <AnimatePresence>
            <motion.div className='w-full border-[1px] relative bg-black px-5 py-4 rounded-lg text-gray-50/70'>
              <motion.pre className='overflow-x-auto'>
                <motion.code>{`<a href="https://imgbox.com/ibO9WDCc" target="_blank"><img src="https://thumbs2.imgbox.com/31/91/ibO9WDCc_t.png" alt="image host"/></a>`}</motion.code>
              </motion.pre>
              <FaCopy className='absolute top-3 z-[6] right-3 shadow-lg shadow-black' />
            </motion.div>
          </AnimatePresence>
        );

      default:
        return (
          <AnimatePresence>
            <motion.div className='w-full border-[1px] relative bg-black px-5 py-4 rounded-lg text-gray-50/70'>
              <motion.pre className='overflow-x-auto'>
                <motion.code>
                  [URL=https://imgbox.com/ibO9WDCc][IMG]https://thumbs2.imgbox.com/31/91/ibO9WDCc_t.png[/IMG][/URL]
                </motion.code>
              </motion.pre>
              <FaCopy className='absolute top-3 z-[6] right-3 shadow-lg shadow-black' />
            </motion.div>
          </AnimatePresence>
        );
    }
  };

  return (
    <AnimatePresence>
      {snap.filesScreen && (
        <motion.section
          {...slideAnimation('up')}
          className='w-full bg-white absolute top-0 left-0 z-[6] flex items-center justify-center'
        >
          <motion.div className='flex flex-col gap-10 items-center justify-center w-[40rem] min-h-screen'>
            <motion.div className='w-full h-[20rem] overflow-hidden rounded-lg'>
              <img
                className='w-full object-cover object-center'
                src='https://images.unsplash.com/photo-1684437310642-c3660c463cf1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=754&q=80'
                alt=''
              />
            </motion.div>

            <motion.div className='w-full inline-flex items-center justify-between text-sm'>
              <span className='inline-flex items-center gap-2'>
                <span className='inline-flex items-center gap-2 border-[1px] rounded-lg px-4 py-2'>
                  View Image <AiOutlineUpload />
                </span>
                <span className='inline-flex items-center gap-2 border-[1px] rounded-lg px-4 py-2'>
                  Share <AiOutlinePlus />
                </span>
                <span className='inline-flex items-center gap-2 border-[1px] rounded-lg px-4 py-2'>
                  Download <AiOutlinePlus />
                </span>
              </span>
              <span className='inline-flex items-center gap-2 border-[1px] rounded-lg px-4 py-2'>
                Delete <GiTimeDynamite className='text-red-500' />
              </span>
            </motion.div>

            <motion.div className='w-full flex flex-col gap-4'>
              <motion.ul className='tabs text-medium'>
                <motion.li
                  onClick={() => setSelectActiveTab('link')}
                  className={`tab tab-lifted ${
                    selectActiveTab === 'link' && 'tab-active text-bold'
                  }`}
                >
                  Links Only
                </motion.li>
                <motion.li
                  onClick={() => setSelectActiveTab('html-code')}
                  className={`tab tab-lifted ${
                    selectActiveTab === 'html-code' && 'tab-active text-bold'
                  }`}
                >
                  HTML-Code
                </motion.li>
                <motion.li
                  onClick={() => setSelectActiveTab('bb-code')}
                  className={`tab tab-lifted ${
                    selectActiveTab === 'bb-code' && ' tab-active text-bold'
                  }`}
                >
                  BB-Code
                </motion.li>
              </motion.ul>

              <motion.div>
                {RenderActiveTab() as unknown as React.ReactNode}
              </motion.div>
            </motion.div>

            <p className='w-full border-[1px] border-rose-300/30 bg-rose-50 px-4 py-2 rounded-lg'>
              Everyone with your file URL can delete it. For limited access
              <Link to='/authenticate' className='font-bold text-rose-500'> register</Link>.
            </p>
          </motion.div>
        </motion.section>
      )}
    </AnimatePresence>
  );
};

export default FileScreen;
