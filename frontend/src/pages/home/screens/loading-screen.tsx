import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { slideAnimation } from '../../../utils/motion';
import { useSnapshot } from 'valtio';
import { screenState } from '../../../utils/state';
import { Button, CircleProgressbar } from '../../../components';
import { FaTimes } from 'react-icons/fa';
import { AiOutlineUpload, AiOutlinePlus } from 'react-icons/ai';
import { GiTimeDynamite } from 'react-icons/gi';
import Logo from '../../../components/logo';
import { useAppwriteContext } from '../../../context/app-write';
import { formatFileSize, hasNoValue } from '../../../utils/functions';

const LoadingScreen = () => {
  const snap = useSnapshot(screenState);
  const [state, setState] = React.useState<boolean>();
  const {
    files,
    handleRemoveFile,
    handleClear,
    handleFile,
    uploadFile,
    documentsData,
  } = useAppwriteContext();

  const handleFileUpload = async () => {
    const uploadPromises = files.map((file) => uploadFile(file));
    const uploadResults = await Promise.all(uploadPromises);
    console.log('file uploads', uploadResults);
  };

  // @desc This effect is responsible for screen changes
  React.useEffect(() => {
    const hasEmptyDocument = hasNoValue(documentsData);
    const hasFiles = files.length > 0;
    const hasNoFiles = files.length === 0;

    if (hasNoFiles) {
      screenState.defaultScreen = true;
      screenState.loadingScreen = false;
      screenState.filesScreen = false;
    }

    setState(hasEmptyDocument);

    screenState.filesScreen = !hasEmptyDocument && hasFiles;
  }, [documentsData, files.length, state]);

  return (
    <AnimatePresence>
      {snap.loadingScreen && (
        <motion.section
          className='w-full bg-white absolute top-0 left-0 z-[5] flex items-center justify-center'
          {...slideAnimation('right')}
        >
          <motion.div className='flex flex-col gap-10 items-center justify-center w-[40rem] min-h-screen'>
            <Logo size='text-2xl' />
            <motion.div className='w-full flex flex-col gap-0 p-0 m-0 items-center justify-center bg-gray-50 border-[1px] rounded-lg'>
              <CircleProgressbar percent={100} />
              <p className='text-sm font-medium pb-3'>
                1.00 Mbit/s | 00:00:16 | 25.11% | 233.32 KB / 24.2 MB
              </p>
            </motion.div>
            <motion.div className='flex flex-col gap-4 items-center justify-center w-full bg-gray-50 border-[1px] rounded-lg px-4 py-2'>
              <motion.div className='w-full inline-flex items-center justify-between text-sm'>
                <span className='inline-flex items-center gap-2'>
                  <Button
                    styles={''}
                    title={'Start'}
                    handleClick={handleFileUpload}
                  >
                    Start <AiOutlineUpload />
                  </Button>
                  <label>
                    <Button styles={''} title={'Add more'}>
                      Add more <AiOutlinePlus />
                      <input
                        type='file'
                        name='file'
                        id='uploader'
                        className='w-0 h-0'
                        onChange={handleFile}
                        multiple
                      />
                    </Button>
                  </label>
                </span>
                <Button styles={''} title={'Clear'} handleClick={handleClear}>
                  Clear <GiTimeDynamite className='text-red-500' />
                </Button>
              </motion.div>
              <motion.div className='w-full flex flex-col gap-2'>
                {files?.map((file, index) => (
                  <motion.div
                    key={index}
                    className='w-full bg-white border-[1px] rounded-lg flex items-center justify-between p-3'
                  >
                    <span className='font-medium'>{file.name}</span>
                    <span className='inline-flex items-center gap-3'>
                      <span>{formatFileSize(file.size)}</span>
                      <Button
                        styles={
                          'border-[1px] p-2 rounded-lg bg-gray-50 hover:bg-rose-500 hover:text-gray-200 cursor-pointer active:ring-2 active:ring-rose-600 active:bg-rose-600 active:border-2 transition-all ease-in-out active:border-white active:text-black'
                        }
                        title={'Clear'}
                        handleClick={() => handleRemoveFile(file.name)}
                      >
                        <FaTimes />
                      </Button>
                    </span>
                  </motion.div>
                ))}

                {files.length === 0 && (
                  <p className='w-full bg-white border-[1px] rounded-lg flex items-center justify-between p-3'>
                    Add files to start uploading
                  </p>
                )}
              </motion.div>
            </motion.div>
            {/* 
            <motion.div className='w-full bg-gray-200 rounded-lg'>
              <motion.button
                onClick={() => {
                  screenState.loadingScreen = false;
                  screenState.filesScreen = true;
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

export default LoadingScreen;
