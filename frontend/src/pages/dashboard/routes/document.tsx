import React from 'react'
import { motion } from 'framer-motion';
import { fadeAnimation, headContainerAnimation } from '../../../utils/motion';
import { BsFillFileSpreadsheetFill } from 'react-icons/bs';
import Layout from '../../../components/dashboard/layout';
import MediaCard from '../../../components/media-card';
import { useAppwriteContext } from '../../../context/app-write';
import { filteredData } from '../../../utils/functions';
import { UserProps } from '../../../interface';
// interface Props {}

const DashboardDocumentFiles = () => {
   const {
     getCurrentUserDocuments,
     setGlobalDocumentData,
     globalDocumentData,
   } = useAppwriteContext();

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
        {...headContainerAnimation}
        className='bg-[rgb(255,255,255,0.2)]  backdrop-blur-md w-full h-full overflow-y-auto p-3'
      >
        <motion.div className='flex flex-wrap gap-2'>
          {globalDocumentData?.map((data, index) => (
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
      </motion.div>
    </Layout>
  );
};

export default DashboardDocumentFiles;
