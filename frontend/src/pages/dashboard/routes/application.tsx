import React from 'react';
import { motion } from 'framer-motion';
import { fadeAnimation } from '../../../utils/motion';
import { useAppwriteContext } from '../../../context/app-write';
import { filteredData } from '../../../utils/functions';
import MediaCard from '../../../components/media-card';
import { UserProps } from '../../../interface';
import Layout from '../../../components/dashboard/layout';
// interface Props {}

const DashboardApplicationFiles = () => {
  const { getCurrentUserDocuments, setGlobalDocumentData, globalDocumentData } =
    useAppwriteContext();

  const getAllUserDocuments = React.useCallback(async (userId: string) => {
    if (userId) {
      const allCurrentUserDocuments = await getCurrentUserDocuments(userId);
      console.log('allCurrentUserDocuments', allCurrentUserDocuments);
      setGlobalDocumentData(
        filteredData(allCurrentUserDocuments?.documents, 'application')
      );
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
        <motion.div className='flex flex-wrap gap-2'>
          {globalDocumentData?.map((data, index) => (
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
      </motion.div>
    </Layout>
  );
};

export default DashboardApplicationFiles;
