import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { slideAnimation } from '../../../utils/motion';
import { ImUpload } from 'react-icons/im';
import { useSnapshot } from 'valtio';
import { screenState } from '../../../utils/state';
import Logo from '../../../components/logo';
import { useAppwriteContext } from '../../../context/app-write';
import { toast } from 'react-toastify';

const UploadScreen = () => {
  const snap = useSnapshot(screenState);
  const { files, handleFile } = useAppwriteContext();

  // @desc This effect is responsible for screen change
  React.useEffect(() => {
    const hasFiles = files.length > 0;
    const hasNoFiles = files.length === 0;

    if (hasFiles) {
      // files.length === 1 && toast.info('File Selected');
      //
      toast.info('File added');
      screenState.defaultScreen = false;
      screenState.loadingScreen = true;
      screenState.filesScreen = false;
    }

    if (hasNoFiles) {
      toast.info('Select a file to upload.');
      screenState.defaultScreen = true;
      screenState.loadingScreen = false;
      screenState.filesScreen = false;
    }
  }, [files]);

  return (
    <AnimatePresence>
      {snap.defaultScreen && (
        <motion.section {...slideAnimation('left')}>
          <motion.div className='w-full flex flex-col gap-1 md:gap-10 items-center justify-center lg:w-[40rem] px-1 md:px-4'>
            <motion.div className='hidden md:block'>
              <Logo size='text-2xl' />
            </motion.div>

            <motion.div className='bg-transparent rounded-lg border-dashed border-2 border-gray-900/50 flex flex-col items-center justify-center md:p-5'>
              <label className='flex flex-col items-center justify-center'>
                <input type='file' onChange={handleFile} className='w-0 h-0' />
                <ImUpload className='text-3xl md:text-7xl' />
                <motion.p className='text-xs text-center mt-5'>
                  Host JPG, GIF and PNG images up to 10MB each. (or Drag and
                  Drop your files here)
                </motion.p>
              </label>
            </motion.div>

            <motion.div className='text-sm font-medium flex flex-col gap-2 p-5'>
              <motion.p className='font-bold'>
                Welcome to our Cloud File Storage!
              </motion.p>
              <motion.p>
                With our secure and reliable cloud file storage service, you can
                easily store, manage, and access your files from anywhere, at
                any time. Whether you're an individual, a small business, or a
                large organization, we provide a seamless and efficient solution
                for your file storage needs.
              </motion.p>
            </motion.div>
          </motion.div>
        </motion.section>
      )}
    </AnimatePresence>
  );
};

export default UploadScreen;
