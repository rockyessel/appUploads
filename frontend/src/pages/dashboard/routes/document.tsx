import React from 'react';
import { motion } from 'framer-motion';
import { headContainerAnimation } from '../../../utils/motion';
import Layout from '../../../components/dashboard/layout';
import MediaCard from '../../../components/media-card';
import { useAppwriteContext } from '../../../context/app-write';
import { filteredData } from '../../../utils/functions';
import { UserDocumentProps, UserProps } from '../../../interface';

const DashboardDocumentFiles = () => {
  const { getCurrentUserDocuments } = useAppwriteContext();
  const [documentData, setDocumentData] = React.useState<
    UserDocumentProps[] | []
  >([]);
  const [loading, setLoading] = React.useState(false);

  const selectedMimetype = [
    'text',
    'text/plain',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'application/vnd.ms-excel',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document ',
    'application/vnd.ms-powerpoint',
    'application/vnd.openxmlformats-officedocument.presentationml.presentation',
    'application/pdf',
    'application/x-zip-compressed',
    'font',
    'application/font-sfnt',
    'application/vnd.ms-fontobject',
    'font/svg',
    'application/x-font-type1',
    'application/postscript',
  ];

  const getAllUserDocuments = React.useCallback(async (userId: string) => {
    if (userId) {
      setLoading(true);
      const allCurrentUserDocuments = await getCurrentUserDocuments(userId);
      console.log('allCurrentUserDocuments', allCurrentUserDocuments);
     setDocumentData(
       filteredData(allCurrentUserDocuments?.documents, selectedMimetype)
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
        {...headContainerAnimation}
        className='bg-[rgb(255,255,255,0.2)]  backdrop-blur-md w-full h-full overflow-y-auto p-3'
      >
        {loading ? (
          <p>Loading documents</p>
        ) : (
          <motion.div className='flex flex-wrap gap-2'>
            {documentData?.map((data, index) => (
              <MediaCard
                data={data}
                key={index}
                extension={`${data?.mimeType?.split('/').shift()} ${
                  data?.extension
                }`}
                value={''}
                svgElementContent={''}
              />
            ))}
          </motion.div>
        )}
      </motion.div>
    </Layout>
  );
};

export default DashboardDocumentFiles;
