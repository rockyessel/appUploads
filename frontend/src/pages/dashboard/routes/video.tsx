import React from 'react';
import { motion } from 'framer-motion';
import { fadeAnimation } from '../../../utils/motion';
import { useAppwriteContext } from '../../../context/app-write';
import MediaCard from '../../../components/media-card';
import { filteredData } from '../../../utils/functions';
import { UserDocumentProps, UserProps } from '../../../interface';
import Layout from '../../../components/dashboard/layout';

const DashboardVideosFiles = () => {
  const { getCurrentUserDocuments } = useAppwriteContext();
  const [videoData, setVideoData] = React.useState<UserDocumentProps[] | []>(
    []
  );
  const [loading, setLoading] = React.useState(false);

  const getAllUserDocuments = React.useCallback(async (userId: string) => {
    if (userId) {
      setLoading(true);
      const allCurrentUserDocuments = await getCurrentUserDocuments(userId);
      setVideoData(filteredData(allCurrentUserDocuments?.documents, ['video']));
      setLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  React.useEffect(() => {
    const getUserFromLocalStorage = window.localStorage.getItem('user');
    const user: UserProps = JSON.parse(`${getUserFromLocalStorage}`);
    if (user) {
      getAllUserDocuments(user.$id);
    }
  }, [getAllUserDocuments]);

  return (
    <Layout>
      <motion.div
        {...fadeAnimation}
        className='bg-transparent w-full h-full overflow-y-auto p-3'
      >
        {loading ? (
          <p>Loading videos</p>
        ) : (
          <motion.div className='flex flex-wrap gap-2'>
            {videoData?.map((data, index) => (
              <MediaCard
                data={data}
                key={index}
                extension={`${data?.mimeType?.split('/').shift()} ${
                  data?.extension
                }`}
              />
            ))}
          </motion.div>
        )}
      </motion.div>
    </Layout>
  );
};

export default DashboardVideosFiles;
