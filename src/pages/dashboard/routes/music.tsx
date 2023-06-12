import React from 'react';
import { motion } from 'framer-motion';
import { fadeAnimation } from '../../../utils/motion';
import { useAppwriteContext } from '../../../context/app-write';
import { UserDocumentProps, UserProps } from '../../../interface';
import { filteredData } from '../../../utils/functions';
import MediaCard from '../../../components/media-card';
import Layout from '../../../components/dashboard/layout';

const DashboardMusicFiles = () => {
const [loading, setLoading] = React.useState(false); // Indicates whether the data is currently being loaded
const { getCurrentUserDocuments } = useAppwriteContext(); // Custom hook to get the function for fetching user documents
const [musicData, setMusicData] = React.useState<UserDocumentProps[] | []>([]); // Stores the user's music data

const getAllUserDocuments = React.useCallback(async (userId: string) => {
  if (userId) {
    setLoading(true); // Set loading state to true
    const allCurrentUserDocuments = await getCurrentUserDocuments(userId); // Fetch all user documents using the getCurrentUserDocuments function
    setMusicData(filteredData(allCurrentUserDocuments?.documents, ['audio'])); // Filter and store the user's music data
    setLoading(false); // Set loading state to false after fetching and updating the data
  }
  // eslint-disable-next-line react-hooks/exhaustive-deps
}, []);

React.useEffect(() => {
  const getUserFromLocalStorage = window.localStorage.getItem('user'); // Get the user data from local storage
  const user: UserProps = JSON.parse(`${getUserFromLocalStorage}`); // Parse the user data
  if (user) {
    getAllUserDocuments(user.$id); // Fetch all user documents when the component mounts or when the user changes
  }
}, [getAllUserDocuments]);


  return (
    <Layout>
      <motion.div
        {...fadeAnimation}
        className='w-full h-full overflow-y-auto p-3'
      >
        {loading ? (
          <p>Loading music</p>
        ) : (
          <motion.div className='flex flex-wrap gap-2'>
            {musicData?.map((data, index) => (
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

export default DashboardMusicFiles;
