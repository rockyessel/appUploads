import React from 'react';
import Layout from '../../../components/dashboard/layout';
import { screenState } from '../../../utils/state';
import { motion } from 'framer-motion';
import { fadeAnimation } from '../../../utils/motion';
import { useAppwriteContext } from '../../../context/app-write';
import { useParams } from 'react-router-dom';
import Plyr from 'plyr';
import 'plyr/dist/plyr.css';
import { UserDocumentProps } from '../../../interface';

const DashboardFileDetails = () => {
  const [documentData, setDocumentData] = React.useState<UserDocumentProps>();
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    screenState.dashboardScreen.settings = false;
    screenState.dashboardScreen.music = false;
    screenState.dashboardScreen.application = false;
    screenState.dashboardScreen.document = false;
    screenState.dashboardScreen.generative = false;
    screenState.dashboardScreen.image = false;
    screenState.dashboardScreen.video = false;
  }, []);

  const router = useParams();
  const videoRef = React.useRef<HTMLVideoElement | null>(null);
  const playerRef = React.useRef<Plyr | null>(null);
  const documentId = router.fileId;

  const { getDocumentById } = useAppwriteContext();

  const getDocumentDataById = React.useMemo(
    () => async () => {
      setLoading(true);
      const data = await getDocumentById(`${documentId}`);
      setDocumentData(data);
      setLoading(false);
    },
    [documentId, getDocumentById]
  );

  console.log('documentData', documentData);

  React.useEffect(() => {
    getDocumentDataById();
  }, [getDocumentDataById]);

  React.useEffect(() => {
    if (videoRef.current && documentData !== undefined) {
      playerRef.current = new Plyr(videoRef.current);
    }

    return () => {
      if (playerRef.current && documentData !== undefined) {
        playerRef.current.pause();
        playerRef.current.muted;
      }
    };
  }, [loading]);

  return (
    <Layout>
      <motion.div
        {...fadeAnimation}
        className='bg-transparent w-full h-full overflow-y-auto p-3'
      >
        <div className='w-full h-40 p-1 rounded-lg shadow-lg bg-transparent-500'>
          <video className='player' ref={videoRef} controls>
            <source
          
              src={documentData?.view}
              type={documentData?.mimeType}
            />
          </video>
        </div>
        <div className='flex flex-col gap-2'>
          <p className='flex flex-col'>
            <span>Filename</span>
            <span>the-girl-who-die-on.mp4</span>
          </p>
          <p className='flex flex-col'>
            <span>File Extension</span>
            <span>MP4</span>
          </p>
          <p className='flex flex-col'>
            <span>File Size</span>
            <span>324.43MB</span>
          </p>
        </div>
      </motion.div>
    </Layout>
  );
};

export default DashboardFileDetails;
