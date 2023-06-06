import React from 'react';
import { motion } from 'framer-motion';
import { fadeAnimation } from '../../../utils/motion';
import { useAppwriteContext } from '../../../context/app-write';
import { filteredData } from '../../../utils/functions';
import MediaCard from '../../../components/media-card';
import { UserDocumentProps, UserProps } from '../../../interface';
import Layout from '../../../components/dashboard/layout';

const DashboardApplicationFiles = () => {
  const { getCurrentUserDocuments } = useAppwriteContext();
  const [applicationData, setApplicationData] = React.useState<
    UserDocumentProps[] | []
  >([]);
  const [loading, setLoading] = React.useState(false);

  const getAllUserDocuments = React.useCallback(async (userId: string) => {
    if (userId) {
      setLoading(true);
      const allCurrentUserDocuments = await getCurrentUserDocuments(userId);
      console.log('allCurrentUserDocuments', allCurrentUserDocuments);
      setApplicationData(
        filteredData(allCurrentUserDocuments?.documents, [
          'application/vnd.debian.binary-package',
          'application/x-apple-diskimage',
          'application/octet-stream',
          'application/x-msdownload',
          'application/x-rpm',
        ])
      );
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
        className='bg-[rgb(255,255,255,0.1)]  backdrop-blur-sm w-full h-full overflow-y-auto p-3'
      >
        {loading ? (
          <p>Loading applications</p>
        ) : (
          <motion.div className='flex flex-wrap gap-2'>
            {applicationData?.map((data, index) => (
              <MediaCard
                svgElementContent={''}s
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

export default DashboardApplicationFiles;
