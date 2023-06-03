import React from 'react';
import { motion } from 'framer-motion';
import { fadeAnimation } from '../../../utils/motion';
import { useAppwriteContext } from '../../../context/app-write';
import { UserDocumentProps, UserProps } from '../../../interface';
import { filteredData } from '../../../utils/functions';
import MediaCard from '../../../components/media-card';
import Layout from '../../../components/dashboard/layout';

const DashboardMusicFiles = () => {
  const { getCurrentUserDocuments, setGlobalDocumentData, globalDocumentData } =
    useAppwriteContext();
  const [musicData, setMusicData] = React.useState<UserDocumentProps[] | []>(
    []
  );
  const [loading, setLoading] = React.useState(false);

  const getAllUserDocuments = React.useCallback(async (userId: string) => {
    if (userId) {
      setLoading(true);
      const allCurrentUserDocuments = await getCurrentUserDocuments(userId);
      setMusicData(filteredData(allCurrentUserDocuments?.documents, 'audio'));
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
        className='bg-[rgb(255,255,255,0.2)]  backdrop-blur-md w-full h-full overflow-y-auto p-3'
      >
        {loading ? (
          <p>Loading music</p>
        ) : (
          <motion.div className='flex flex-wrap gap-2'>
            {musicData?.map((data, index) => (
              <MediaCard
                svgElementContent={''}
                data={data}
                key={index}
                extension={`${data?.mimeType?.split('/').shift()} ${
                  data?.extension
                }`}
                value={''}
              />
            ))}
          </motion.div>
        )}
      </motion.div>
    </Layout>
  );
};

export default DashboardMusicFiles;
