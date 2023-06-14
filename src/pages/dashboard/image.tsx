import React from 'react';
import { motion } from 'framer-motion';
import { headContainerAnimation } from '../../utils/motion';
import MediaCard from '../../components/media-card';
import { useAppwriteContext } from '../../context/app-write';
import { UserDocumentProps, UserProps } from '../../interface';
import { filteredData } from '../../utils/functions';
import Layout from '../../components/dashboard/layout';

const DashboardImageFiles = () => {
  const [loading, setLoading] = React.useState(false); // Indicates whether the data is currently being loaded
  const { getCurrentUserDocuments } = useAppwriteContext(); // Custom hook to get the function for fetching user documents
  const [imageData, setImageData] = React.useState<UserDocumentProps[] | []>([]); // Stores the user's image data

  const getAllUserDocuments = React.useCallback(async (userId: string) => {
    if (userId) {
      setLoading(true); // Set loading state to true
      const allCurrentUserDocuments = await getCurrentUserDocuments(userId); // Fetch all user documents using the getCurrentUserDocuments function
      console.log('allCurrentUserDocuments', allCurrentUserDocuments); // Log the retrieved user documents to the console
      setImageData(filteredData(allCurrentUserDocuments?.documents, ['image'])); // Filter and store the user's image data
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
        {...headContainerAnimation}
        className='bg-[rgb(255,255,255,0.2)]  backdrop-blur-md w-full h-full overflow-y-auto p-3'
      >
        {loading ? (
          <p>Loading images</p>
        ) : (
          <motion.div className='flex flex-wrap gap-2'>
            {imageData?.map((data, index) => (
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

export default DashboardImageFiles;
