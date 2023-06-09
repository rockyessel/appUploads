import React from 'react';
import Layout from '../../../components/dashboard/layout';
import { screenState } from '../../../utils/state';
import { motion } from 'framer-motion';
import { fadeAnimation, slideAnimation } from '../../../utils/motion';
import { useAppwriteContext } from '../../../context/app-write';
import { useParams } from 'react-router-dom';
import { UserDocumentProps } from '../../../interface';
import { TabComponentCard } from '../../../components';
import FileAction from '../../../components/file-action';
// import { useSnapshot } from 'valtio';
import { format } from 'date-fns';
import MediaViewerCard from '../../../components/media-viewer-card';
import { hasNoValue } from '../../../utils/functions';
// import AudioPlayer from '../../../components/media-viewer-card/audio/AudioPlayer';

const DashboardFileDetails = () => {
  const [documentData, setDocumentData] = React.useState<UserDocumentProps>();
  const [loading, setLoading] = React.useState(true);
  // const snap = useSnapshot(screenState);

  React.useEffect(() => {
    screenState.dashboardScreen.default = false;
  }, []);

  console.log('loading', loading);

  const router = useParams();
  const fileCategory = router.fileCategory;
  console.log('router', router);
  const documentId = router.fileId;

  const { getDocumentById } = useAppwriteContext();

  const getDocumentDataById = React.useMemo(
    () => async () => {
      try {
        const data = await getDocumentById(`${documentId}`);
        setDocumentData(data);
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    },
    [documentId, getDocumentById]
  );

  const formattedCreatedAt = documentData?.createdAt
    ? format(new Date(documentData.createdAt), 'do MMMM Y')
    : '';

  console.log('documentData', documentData);
  const noDataFromId = hasNoValue(documentData);
  console.log('noDataFromId', noDataFromId);

  React.useEffect(() => {
    getDocumentDataById();
  }, [getDocumentDataById]);

  return (
    <Layout>
      <motion.section
        className='w-full h-full'
        {...slideAnimation('up')}
      >
        <motion.div {...fadeAnimation} className='w-full px-4'>
          <div className='w-full'>
            {loading ? (
              <p>Loading</p>
            ) : !noDataFromId && documentData ? (
              <div className='w-full h-full flex flex-col gap-10 mt-10'>
                <div className='w-full'>
                  <MediaViewerCard
                    fileCategory={fileCategory}
                    documentData={documentData}
                  />
                </div>
                <div className='w-full flex flex-col gap-5'>
                  <div className='w-full flex flex-col gap-5'>
                    <div className='w-full flex flex-wrap justify-start gap-10 rounded-lg bg-[rgba(255,255,255,0.4)] backdrop-blur-md p-3'>
                      <p className='flex flex-col'>
                        <span className='font-bold'>Filename</span>
                        <span className=''>{documentData?.filename}</span>
                      </p>
                      <p className='flex flex-col'>
                        <span className='font-bold'>File Extension</span>
                        <span>{documentData?.extension}</span>
                      </p>
                      <p className='flex flex-col'>
                        <span className='font-bold'>File Size</span>
                        <span>{documentData?.size}</span>
                      </p>
                      <p className='flex flex-col'>
                        <span className='font-bold'>Uploaded on</span>
                        <span>{formattedCreatedAt}</span>
                      </p>
                      <p className='flex flex-col'>
                        <span className='font-bold'>Mimetype on</span>
                        <span>{documentData?.mimeType}</span>
                      </p>
                    </div>
                  </div>
                  <div className='w-full mb-5 overflow-hidden relative flex flex-col gap-4 rounded-lg bg-[rgba(255,255,255,0.4)] backdrop-blur-md p-3'>
                    <FileAction documentData={documentData} />
                    <TabComponentCard
                      documentData={documentData ? [documentData] : []}
                    />
                  </div>
                </div>
              </div>
            ) : (
              <p>Data is not available</p>
            )}
          </div>
        </motion.div>
      </motion.section>
    </Layout>
  );
};

export default DashboardFileDetails;
