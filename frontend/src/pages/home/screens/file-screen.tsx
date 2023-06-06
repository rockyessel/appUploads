import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSnapshot } from 'valtio';
import { screenState } from '../../../utils/state';
import { slideAnimation } from '../../../utils/motion';
import { AiOutlineUpload, AiOutlinePlus } from 'react-icons/ai';
import { GiTimeDynamite } from 'react-icons/gi';
import { useAppwriteContext } from '../../../context/app-write';
import { hasNoValue } from '../../../utils/functions';
import { useNavigate } from 'react-router-dom';
import { Button, DisplayCard, TabComponentCard } from '../../../components';
import SvgCard from '../../../components/media-card/svg';
import MediaCard from '../../../components/media-card';

const FileScreen = () => {
  const [currentSlider, setCurrentSlider] = React.useState(0);
  const [state, setState] = React.useState<boolean>();
  const snap = useSnapshot(screenState);
  const { documentsData, files, handleClear } = useAppwriteContext();

  console.log('documentsData', documentsData);

  const imageLength = documentsData.length;

  // @desc This effect is responsible for screen change
  React.useEffect(() => {
    const hasEmptyDocument = hasNoValue(documentsData);
    const hasNoFiles = files.length === 0;
    const hasFiles = files.length > 0;
    const hasDocumentData = documentsData.length === 0;

    if (hasNoFiles) {
      screenState.loadingScreen = false;
      screenState.defaultScreen = true;
      screenState.filesScreen = false;
    }

    if (hasFiles && hasDocumentData) {
      screenState.loadingScreen = true;
      screenState.defaultScreen = false;
      screenState.filesScreen = false;
    }

    if (files.length > 0 && documentsData.length > 0) {
      screenState.loadingScreen = false;
      screenState.defaultScreen = false;
      screenState.filesScreen = true;
    }

    setState(hasEmptyDocument);
  }, [documentsData, documentsData?.length, files.length, state]);

  const handleMoveDot = (index: number) => {
    setCurrentSlider(index);
    console.log('index', index);
  };

  return (
    <AnimatePresence>
      {snap.filesScreen && (
        <motion.section className='w-full' {...slideAnimation('up')}>
          <motion.div className='w-full flex flex-col gap-10 items-center justify-center lg:w-[40rem] px-4'>
            <div>
              {documentsData.map(
                (document, index) =>
                  document.mimeType.startsWith('image') &&
                  !document.mimeType.includes('svg+xml') && (
                    <div key={index}>
                      {document.$id === documentsData[currentSlider].$id && (
                        <div>
                          <MediaCard
                            svgElementContent={''}
                            data={document}
                            key={index}
                            extension={`image ${document.extension}`}
                            value={document.view}
                          />
                        </div>
                      )}
                    </div>
                  )
              )}

              {documentsData.map(
                (document, index) =>
                  document.mimeType.startsWith('audio') && (
                    <div key={index}>
                      {document.$id === documentsData[currentSlider].$id && (
                        <div>
                          <MediaCard
                            svgElementContent={''}
                            data={document}
                            key={index}
                            extension={`audio ${document.extension}`}
                            value={document.view}
                          />
                        </div>
                      )}
                    </div>
                  )
              )}

              {documentsData.map(
                (document, index) =>
                  document.mimeType.startsWith('video') && (
                    <div key={index}>
                      {document.$id === documentsData[currentSlider].$id && (
                        <div>
                          <MediaCard
                            svgElementContent={''}
                            data={document}
                            key={index}
                            extension={`video ${document.extension}`}
                            value={document.view}
                          />
                        </div>
                      )}
                    </div>
                  )
              )}

              {documentsData.map(
                (document, index) =>
                  document.mimeType.startsWith('image') &&
                  document.mimeType.includes('svg') && (
                    <div key={index}>
                      {document.$id === documentsData[currentSlider].$id && (
                        <div>
                          <span>Hello Wworld</span>
                          {document ? (
                            <SvgCard documentData={document} />
                          ) : (
                            'fdfdfdfdfdfdfdf'
                          )}
                        </div>
                      )}
                    </div>
                  )
              )}
            </div>

            <div className={'flex justify-center gap-3 relative bottom-[2rem]'}>
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

            <div>
              <Button styles='' title='Go back' handleClick={handleClear}>
                Go back
              </Button>
            </div>

            <TabComponentCard documentData={documentsData} />
          </motion.div>
        </motion.section>
      )}
    </AnimatePresence>
  );
};

export default FileScreen;
