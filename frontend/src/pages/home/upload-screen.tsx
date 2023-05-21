import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { slideAnimation } from '../../utils/motion';
import { ImUpload } from 'react-icons/im';
import { useSnapshot } from 'valtio';
import { screenState } from '../../utils/state';
import Logo from '../../components/logo';
import { useAppwriteContext } from '../../context/app-write';

const UploadScreen = () => {
  const snap = useSnapshot(screenState);
  const { files, handleFile } = useAppwriteContext();

  console.log('files', files);

  React.useEffect(() => {
    if (files.length === 0) return
    else {
      screenState.defaultScreen = false;
      screenState.loadingScreen = true;
    }
  }, [files]);

  return (
    <AnimatePresence>
      {snap.defaultScreen && (
        <motion.section
          {...slideAnimation('left')}
          className='flex items-center justify-center min-h-screen w-full overflow-hidden mb-10'
        >
          <motion.div className='flex flex-col gap-10 items-center justify-center w-[20rem]'>
            <motion.div>
              <Logo size='text-2xl' />
            </motion.div>

            <motion.div className='bg-gray-50 rounded-lg border-dashed border-2 border-gray-900/50 flex flex-col items-center justify-center p-5'>
              <label className='flex flex-col items-center justify-center'>
                <input type='file' onChange={handleFile} className='w-0 h-0' />
                <ImUpload className='text-7xl' />
                <motion.p className='text-xs text-center mt-5'>
                  Host JPG, GIF and PNG images up to 10MB each. (or Drag and
                  Drop your files here)
                </motion.p>
              </label>
            </motion.div>

            <motion.div className='bg-gray-50 rounded-lg text-sm font-medium border-2 border-gray-900/50 flex flex-col items-center justify-center p-5'>
              <motion.p>
                is a free service with more than 7 years of history, empowering
                people to upload, share and enjoy images online. Hosting
                millions of files requires massive resources and it simply
                became too big for our previous hosting platform to handle. We
                are pleased to announce we have partnered with a new team that
                have extensive experience in large-scale hosting, our new gen
                hardware enables us to continue to provide the high standard of
                service that you are used to, while preparing us for many
                billions of files into the future. Sincerely, The Team
              </motion.p>
            </motion.div>

            {/* <motion.div className='w-full bg-gray-200 rounded-lg'>
              <motion.button
                onClick={() => {
                  screenState.defaultScreen = false;
                  screenState.loadingScreen = true;
                }}
                className='px-3 py-1.5 cursor-pointer hover:ring-2 hover:ring-gray-300 active:ring-4 active:ring-gray-400'
              >
                Upload Now
              </motion.button>
            </motion.div> */}
          </motion.div>
        </motion.section>
      )}
    </AnimatePresence>
  );
};

export default UploadScreen;
