import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSnapshot } from 'valtio';
import { screenState } from '../../../utils/state';
import { slideAnimation } from '../../../utils/motion';
import { FaCopy } from 'react-icons/fa';
import { AiOutlineUpload, AiOutlinePlus } from 'react-icons/ai';
import { GiTimeDynamite } from 'react-icons/gi';
import { Link } from 'react-router-dom';
import { useAppwriteContext } from '../../../context/app-write';
import { hasNoValue } from '../../../utils/functions';
import { useNavigate } from 'react-router-dom';
import { Button, DisplayCard, TabComponentCard } from '../../../components';
import SvgCard from '../../../components/media-card/svg';

const FileScreen = () => {
  const [selectActiveTab, setSelectActiveTab] = React.useState('link');
  const [currentSlider, setCurrentSlider] = React.useState(0);
  const [state, setState] = React.useState<boolean>();
  const snap = useSnapshot(screenState);
  const { documentsData, files } = useAppwriteContext();
  const navigate = useNavigate();

  console.log('documentsData', documentsData);

  const imageLength = documentsData.length;

  const handleDelete = async () => {
    // await deleteFrom_db_bucket(`${documentsData?.$id}`);
    navigate(0);
  };

  // @desc This effect is responsible for screen change
  React.useEffect(() => {
    const hasEmptyDocument = hasNoValue(documentsData);
    const hasNoFiles = files.length === 0;

    if (hasEmptyDocument && hasNoFiles) {
      screenState.loadingScreen = false;
      screenState.defaultScreen = true;
      screenState.filesScreen = false;
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
        <motion.section
          {...slideAnimation('up')}
          className='w-full bg-[rgb(255,255,255,0.4)] backdrop-blur-lg  absolute top-0 left-0  flex items-center justify-center px-4'
        >
          <motion.div className='flex flex-col gap-10 items-center justify-center w-[40rem] min-h-screen'>
            <div>
              {documentsData.map(
                (document, index) =>
                  document.mimeType.startsWith('image') &&
                  !document.mimeType.includes('svg+xml') && (
                    <div key={index}>
                      {document.$id === documentsData[currentSlider].$id && (
                        <div>
                          <DisplayCard
                            data={document}
                            key={index}
                            extension={document.extension}
                            value={document.view}
                          />
                          <span>hello {document?.filename}</span>
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
                          <DisplayCard
                            data={document}
                            key={index}
                            extension={document.extension}
                            value={document.view}
                          />
                          <span>hello {document?.filename}</span>
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
                        ? 'w-[3rem] h-2  bg-blue-500 transition-all duration-500 ease-in-out '
                        : 'w-[1rem] h-2'
                    } rounded-md  bg-transparent-200`}
                  ></div>
                );
              })}
            </div>
            <motion.div className='w-full inline-flex items-center justify-between text-sm'>
              <div className='inline-flex items-center gap-2'>
                <a target='_blank' rel='noopener'>
                  <Button styles={''} title={'View file'}>
                    View File <AiOutlineUpload />
                  </Button>
                </a>
                <Button styles={''} title={'Share'}>
                  Share <AiOutlinePlus />
                </Button>
                <Button styles={''} title={'Download'}>
                  Download <AiOutlinePlus />
                </Button>
              </div>
              <Button styles={''} title={'Share'} handleClick={handleDelete}>
                Delete <GiTimeDynamite className='text-red-500' />
              </Button>
            </motion.div>

            <TabComponentCard documentData={documentsData} />

            <p className='w-full border-[1px] border-rose-300/30 bg-rose-50 px-4 py-2 rounded-lg'>
              Everyone with your file URL can delete it. For limited access
              <Link to='/authenticate' className='font-bold text-rose-500'>
                {' '}
                register
              </Link>
              .
            </p>
          </motion.div>
        </motion.section>
      )}
    </AnimatePresence>
  );
};

export default FileScreen;
