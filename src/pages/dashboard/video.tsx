import React from 'react';
import { motion } from 'framer-motion';
import { fadeAnimation } from '../../utils/motion';
import { useAppwriteContext } from '../../context/app-write';
import MediaCard from '../../components/media-card';
import { filteredData } from '../../utils/functions';
import { UserDocumentProps, UserProps } from '../../interface';
import Layout from '../../components/dashboard/layout';

const DashboardVideosFiles = () => {
  const { getCurrentUserDocuments } = useAppwriteContext(); // Custom hook to get the function for fetching user documents
  const [videoData, setVideoData] = React.useState<UserDocumentProps[] | []>(
    []
  ); // Stores the user's video data
  const [loading, setLoading] = React.useState(false); // Indicates whether the data is currently being loaded

  const getAllUserDocuments = React.useCallback(async (userId: string) => {
    if (userId) {
      setLoading(true); // Set loading state to true
      const allCurrentUserDocuments = await getCurrentUserDocuments(userId); // Fetch all user documents using the getCurrentUserDocuments function
      setVideoData(filteredData(allCurrentUserDocuments?.documents, ['video'])); // Filter and store the user's video data
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
        className='bg-transparent w-full h-full overflow-y-auto p-3'
      >
        {/* Conditionally render loading state or video cards */}
        {loading ? (
          <p>Loading videos</p> // Display a loading message when videos are being loaded
        ) : (
          <motion.div className='flex flex-wrap gap-2'>
            {/* Render video cards */}
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
