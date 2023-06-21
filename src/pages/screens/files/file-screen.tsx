import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSnapshot } from 'valtio';
import { screenState } from '../../../utils/state';
import { slideAnimation } from '../../../utils/motion';
import { useAppwriteContext } from '../../../context/app-write';
import { hasNoValue } from '../../../utils/functions';
import {
  Button,
  TabComponentCard,
  DisplayUploadedFiles,
} from '../../../components';
import FileAction from '../../../components/file/file-action';

const FileScreen = () => {
  // State variables
  const [currentSlider, setCurrentSlider] = React.useState(0); // Keeps track of the current slider index
  const [state, setState] = React.useState<boolean>(); // State variable used for screen change
  const [loading, setLoading] = React.useState<boolean>(); // State variable used for displaying loading message

  // Accessing snapshot and app context
  const snap = useSnapshot(screenState); // Accessing the snapshot of screenState
  const { documentsData, files, handleClear } = useAppwriteContext(); // Accessing data and functions from the app context

  // console.log('documentsData', documentsData); // Logging the value of documentsData to the console

  const imageLength = documentsData.length; // Getting the length of the documentsData array

  // Effect for screen change
  React.useEffect(() => {
    // Checking various conditions to determine the current screen state
    const hasEmptyDocument = hasNoValue(documentsData);
    const hasNoFiles = files.length === 0;
    const hasFiles = files.length > 0;
    const hasDocumentData = documentsData.length === 0;

    if (hasNoFiles) {
      // If there are no files, show the default screen
      screenState.loadingScreen = false;
      screenState.defaultScreen = true;
      screenState.filesScreen = false;
    }

    if (hasFiles && hasDocumentData) {
      // If there are files but no document data, show the loading screen
      screenState.loadingScreen = true;
      screenState.defaultScreen = false;
      screenState.filesScreen = false;
    }

    if (files.length > 0 && documentsData.length > 0) {
      // If there are both files and document data, show this screen
      screenState.loadingScreen = false;
      screenState.defaultScreen = false;
      screenState.filesScreen = true;
    }

    setState(hasEmptyDocument); // Update the state variable based on whether the documentsData is empty
  }, [documentsData, documentsData?.length, files.length, state]);

  React.useEffect(() => {
    if (files.length !== documentsData.length) {
      setLoading(true);
    } else {
      setLoading(false);
    }
  }, [documentsData.length, files.length]);

  // Function to handle moving the dot in the slider
  const handleMoveDot = (index: number) => {
    setCurrentSlider(index); // Update the currentSlider state with the provided index
  };

  return (
    <AnimatePresence>
      {/* filesScreen Screen */}
      {snap.filesScreen && (
        // Section for displaying media content
        <motion.section
          className='w-full h-full flex items-center justify-center'
          {...slideAnimation('up')}
        >
          <motion.div className='w-full flex flex-col gap-10 items-center justify-center lg:w-[40rem] px-4'>
            <DisplayUploadedFiles
              currentSlider={currentSlider}
              documentsData={documentsData}
            />
            <div className={'flex justify-center gap-3 relative bottom-[2rem]'}>
              {/* Rendering dots for slider navigation */}
              {Array.from({ length: imageLength }).map((_, index: number) => {
                return (
                  <div
                    key={index}
                    onClick={() => handleMoveDot(index)}
                    className={`${
                      currentSlider === index
                        ? 'w-[3rem] h-2  bg-[rgb(255,255,255,0.6)] backdrop-blur-lg transition-all duration-500 ease-in-out '
                        : 'w-[1rem] h-2'
                    } rounded-md  bg-[rgb(255,255,255,0.4)] backdrop-blur-lg`}
                  ></div>
                );
              })}
            </div>
            <div className='w-full'>
              {/* Button to go back */}
              <Button styles='' title='Go back' handleClick={handleClear}>
                Go back
              </Button>
            </div>
            <div className='w-full rounded-lg bg-[rgba(255,255,255,0.4)] dark:bg-[rgb(180,173,173,0.5)] backdrop-blur-md p-3 flex flex-col gap-3'>
              {/* Component for displaying document data in a tab format */}
              <FileAction documentData={documentsData[currentSlider]} />
              <TabComponentCard documentData={[documentsData[currentSlider]]} />
              {loading && (
                <p>
                  {documentsData.length}/{files.length}Loading
                </p>
              )}
            </div>
          </motion.div>
        </motion.section>
      )}
    </AnimatePresence>
  );
};

export default FileScreen;
