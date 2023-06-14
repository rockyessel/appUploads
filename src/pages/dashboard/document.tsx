import React from 'react';
import { motion } from 'framer-motion';
import { headContainerAnimation } from '../../utils/motion';
import Layout from '../../components/dashboard/layout';
import MediaCard from '../../components/media-card';
import { useAppwriteContext } from '../../context/app-write';
import { filteredData } from '../../utils/functions';
import { UserDocumentProps, UserProps } from '../../interface';
import { Loader } from '../../components';

const DashboardDocumentFiles = () => {
  const { getCurrentUserDocuments } = useAppwriteContext(); // Custom hook to get the function for fetching user documents
  const [documentData, setDocumentData] = React.useState<
    UserDocumentProps[] | []
  >([]); // Stores the user's document data
  const [loading, setLoading] = React.useState(false); // Indicates whether the data is currently being loaded

  const selectedMimetype = [
    // Array of selected MIME types
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
      setLoading(true); // Set loading state to true
      const allCurrentUserDocuments = await getCurrentUserDocuments(userId); // Fetch all user documents using the getCurrentUserDocuments function
      console.log('allCurrentUserDocuments', allCurrentUserDocuments); // Log the fetched user documents for debugging purposes
      setDocumentData(
        filteredData(allCurrentUserDocuments?.documents, selectedMimetype)
      ); // Filter and store the user's document data based on selected MIME types
      setLoading(false); // Set loading state to false after fetching and updating the data
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  React.useEffect(() => {
    const getUserFromLocalStorage =
      window.localStorage.getItem('appwrite_user'); // Get the user data from local storage
    const user: UserProps = JSON.parse(`${getUserFromLocalStorage}`); // Parse the user data
    if (user) {
      getAllUserDocuments(user.$id); // Fetch all user documents when the component mounts or when the user changes
    }
  }, [getAllUserDocuments]);

  return (
    <Layout>
      <motion.div
        {...headContainerAnimation}
        className='bg-[rgb(255,255,255,0.2)]  backdrop-blur-md w-full h-full overflow-y-auto p-3'
      >
        {loading ? (
          <Loader message='Documents' />
        ) : documentData.length === 0 ? null : (
          <motion.div className='flex flex-wrap gap-2'>
            {documentData?.map((data, index) => (
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

export default DashboardDocumentFiles;
