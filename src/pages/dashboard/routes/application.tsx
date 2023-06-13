import React from 'react';
import { motion } from 'framer-motion';
import { fadeAnimation } from '../../../utils/motion';
import { useAppwriteContext } from '../../../context/app-write';
import { filteredData } from '../../../utils/functions';
import MediaCard from '../../../components/media-card';
import { UserDocumentProps, UserProps } from '../../../interface';
import Layout from '../../../components/dashboard/layout';

const DashboardApplicationFiles = () => {
  const { getCurrentUserDocuments } = useAppwriteContext(); // Get the function for fetching user documents from the Appwrite context
  const [applicationData, setApplicationData] = React.useState<UserDocumentProps[] | []>([]); // Store the user's application document data
  const [loading, setLoading] = React.useState(false); // Indicates whether the data is currently being loaded

  const getAllUserDocuments = React.useCallback(async (userId: string) => {
    if (userId) {
      setLoading(true); // Set loading state to true
      const allCurrentUserDocuments = await getCurrentUserDocuments(userId); // Fetch all user documents using the getCurrentUserDocuments function
      console.log('allCurrentUserDocuments', allCurrentUserDocuments); // Log the fetched user documents for debugging purposes
      setApplicationData(
        filteredData(allCurrentUserDocuments?.documents, [
          // Filter and store the user's application document data based on selected MIME types
          'application/vnd.debian.binary-package',
          'application/x-apple-diskimage',
          'application/octet-stream',
          'application/x-msdownload',
          'application/x-rpm',
        ])
      );
      setLoading(false); // Set loading state to false after fetching and updating the data
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  React.useEffect(() => {
    const getUserFromLocalStorage = window.localStorage.getItem('appwrite_user'); // Get the user data from local storage
    const user: UserProps = JSON.parse(`${getUserFromLocalStorage}`); // Parse the user data
    if (user) {
      getAllUserDocuments(user.$id); // Fetch all user documents when the component mounts or when the user changes
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

export default DashboardApplicationFiles;
