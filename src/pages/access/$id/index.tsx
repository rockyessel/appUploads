import React from 'react';
import { motion } from 'framer-motion';
import { useParams } from 'react-router-dom';
import { useAppwriteContext } from '../../../context/app-write';
import { UserDocumentProps } from '../../../interface';
import MediaViewerCard from '../../../components/media-viewer-card';
import { FileDescription, Loader, TabComponentCard } from '../../../components';
import { fadeAnimation, slideAnimation } from '../../../utils/motion';
import FileAction from '../../../components/file/file-action';
import { hasNoValue } from '../../../utils/functions';

// interface Props {}

const AccessDocumentPage = () => {
  const [documentData, setDocumentData] = React.useState<UserDocumentProps>();

  const [loading, setLoading] = React.useState(true); // State for indicating if the data is currently being loaded
  const router = useParams();

  const _$id = router.$id;
  const { getDocumentById } = useAppwriteContext();

  React.useEffect(() => {
    if (_$id) {
      getDocumentById(_$id).then((res) => setDocumentData(res));
      setLoading(false);
    }
  }, [_$id, getDocumentById]);

  const subDirectoryMap: { [key: string]: string } = {
    app: 'application',
    deb: 'application',
    apk: 'application',
    xapk: 'application',
    audio: 'music',
    image: 'image',
    video: 'video',
  };

  const extension = `${documentData?.mimeType.split('/').shift()}`;
  const subDirectory = subDirectoryMap[extension] || 'document';
  const noDataFromId = hasNoValue(documentData); // Checking if the documentData has no value
  return (
    <motion.main className='w-full h-full' {...slideAnimation('up')}>
      <motion.div {...fadeAnimation} className='w-full px-4'>
        <div className='w-full'>
          {/* State */}
          {loading ? (
            // Display loading screen if `loading` is true
            <Loader message='Almost there..' />
          ) : !noDataFromId && documentData ? (
            // Hide loading screen and display file information if `noDataFromId` is false and `documentData` exists
            <div className='w-full h-full flex flex-col gap-10 mt-10'>
              <div className='w-full'>
                {/* Displaying the current file visually */}
                <MediaViewerCard
                  fileCategory={subDirectory}
                  documentData={documentData}
                />
              </div>

              <div className='w-full flex flex-col gap-5'>
                {/* Displaying all information about the current file */}
                <FileDescription documentData={documentData} />
                <div className='w-full mb-5 overflow-hidden relative flex flex-col gap-4 rounded-lg bg-[rgba(255,255,255,0.4)] backdrop-blur-md p-3'>
                  {/* Actions related to the current file */}
                  <FileAction documentData={documentData} />
                  <TabComponentCard
                    documentData={documentData ? [documentData] : []}
                  />
                </div>
              </div>
            </div>
          ) : (
            // Display message if there is no data available
            <p>Data is not available</p>
          )}
        </div>
      </motion.div>
    </motion.main>
  );
};

export default AccessDocumentPage;
