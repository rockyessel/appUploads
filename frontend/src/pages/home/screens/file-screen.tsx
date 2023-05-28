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
import { downloadFile, hasNoValue } from '../../../utils/functions';
import { useNavigate } from 'react-router-dom';
import { DisplayCard } from '../../../components';
import SvgCard from '../../../components/media-card/svg';

const FileScreen = () => {
  const [selectActiveTab, setSelectActiveTab] = React.useState('link');
  const [currentSlider, setCurrentSlider] = React.useState(0);
  const [state, setState] = React.useState<boolean>();
  const snap = useSnapshot(screenState);
  const { documentsData, deleteFrom_db_bucket, files } = useAppwriteContext();
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

  console.log('######docv', document);

  const RenderActiveTab = () => {
    switch (selectActiveTab) {
      case 'link':
        return (
          <AnimatePresence>
            <motion.div className='w-full border-[1px] relative bg-black px-5 py-4 rounded-lg text-gray-50/70'>
              <motion.pre className='overflow-x-auto flex flex-col'>
                {documentsData?.map((document, index) => (
                  <motion.code key={index}>{document?.view}</motion.code>
                ))}
              </motion.pre>
              <FaCopy className='absolute top-3 z-[6] right-3 shadow-lg shadow-black' />
            </motion.div>
          </AnimatePresence>
        );
      case 'html-code':
        return (
          <AnimatePresence>
            <motion.div className='w-full border-[1px] relative bg-black px-5 py-4 rounded-lg text-gray-50/70'>
              <motion.pre className='overflow-x-auto flex flex-col'>
                {documentsData?.map((document, index) => (
                  <motion.code
                    key={index}
                  >{`<a href=${document?.view} target="_blank"><img src=${document?.view} alt=${document?.filename}/></a>`}</motion.code>
                ))}
              </motion.pre>
              <FaCopy className='absolute top-3 z-[6] right-3 shadow-lg shadow-black' />
            </motion.div>
          </AnimatePresence>
        );

      default:
        return (
          <AnimatePresence>
            <motion.div className='w-full border-[1px] relative bg-black px-5 py-4 rounded-lg text-gray-50/70'>
              <motion.pre className='overflow-x-auto flex flex-col'>
                {documentsData?.map((document, index) => (
                  <motion.code key={index}>
                    {`[URL=${document?.$id}][IMG]${document?.view}[/IMG][/URL]`}
                  </motion.code>
                ))}
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
          className='w-full bg-white absolute top-0 left-0 z-[6] flex items-center justify-center px-4'
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
                    } rounded-md  bg-gray-200`}
                  ></div>
                );
              })}
            </div>
            <motion.div className='w-full inline-flex items-center justify-between text-sm'>
              <span className='inline-flex items-center gap-2'>
                <a target='_blank' rel='noopener'>
                  <span className='inline-flex items-center gap-2 border-[1px] rounded-lg px-4 py-2'>
                    View File <AiOutlineUpload />
                  </span>
                </a>
                <span className='inline-flex items-center gap-2 border-[1px] rounded-lg px-4 py-2'>
                  Share <AiOutlinePlus />
                </span>
                <span
                  // onClick={() =>
                  //   downloadFile(document?.view, document?.filename)
                  // }
                  className='inline-flex items-center gap-2 border-[1px] rounded-lg px-4 py-2'
                >
                  Download <AiOutlinePlus />
                </span>
              </span>
              <span
                onClick={handleDelete}
                className='inline-flex items-center gap-2 border-[1px] rounded-lg px-4 py-2'
              >
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
