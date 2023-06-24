import React from 'react';
import { UserDocumentProps } from '../../interface';
import { screenState } from '../../utils/state';
import { useParams } from 'react-router-dom';
import { useAppwriteContext } from '../../context/app-write';
import { hasNoValue } from '../../utils/functions';
import Layout from '../../components/dashboard/layout';
import { fadeAnimation, slideAnimation } from '../../utils/motion';
import MediaViewerCard from '../../components/media-viewer-card';
import FileAction from '../../components/file/file-action';
import { FileDescription, Loader, TabComponentCard } from '../../components';
import { motion } from 'framer-motion';

const DashboardFileDetails = () => {
  const [documentData, setDocumentData] = React.useState<UserDocumentProps>(); // State for storing the document data
  const [loading, setLoading] = React.useState(true); // State for indicating if the data is currently being loaded

  React.useEffect(() => {
    screenState.dashboardScreen.default = false; // Modifying the screen state for the dashboard screen
  }, []);

  const router = useParams(); // Accessing the router parameters
  const fileCategory = router.fileCategory; // Extracting the file category from the router
  const documentId = router.fileId; // Extracting the document ID from the router

  const { getDocumentById } = useAppwriteContext(); // Accessing the document retrieval function from the Appwrite context

  const getDocumentDataById = React.useMemo(
    () => async () => {
      try {
        const data = await getDocumentById(`${documentId}`); // Retrieving the document data by ID
        setDocumentData(data); // Updating the state with the retrieved document data
        setLoading(false); // Updating the loading state to indicate the data is no longer being fetched
      } catch (error) {
        setLoading(false); // Handling any errors and updating the loading state accordingly
      }
    },
    [documentId, getDocumentById] // Dependencies for the memoized callback function
  );

  // console.log('documentData', documentData); // Logging the value of the documentData state variable
  const noDataFromId = hasNoValue(documentData); // Checking if the documentData has no value
  // console.log('noDataFromId', noDataFromId); // Logging the value of noDataFromId

  React.useEffect(() => {
    getDocumentDataById(); // Calling the getDocumentDataById function on component mount or when its dependencies change
  }, [getDocumentDataById]); // Dependency array for the useEffect hook

  return (
    <Layout>
      <motion.section className='w-full h-full' {...slideAnimation('up')}>
        <motion.div {...fadeAnimation} className='w-full px-4'>
          <div className='w-full'>
            {/* State */}
            {loading ? (
              // Display loading screen if `loading` is true
              <Loader message='Almost there..' />
            ) : !noDataFromId && documentData ? (
              // Hide loading screen and display file information if `noDataFromId` is false and `documentData` exists
              <div className='w-full h-full flex flex-col gap-10 mt-10'>
                <div className='w-full'>
                  {/* Displaying the current file visually */}
                  <MediaViewerCard
                    fileCategory={fileCategory}
                    documentData={documentData}
                  />
                </div>

                <div className='w-full flex flex-col gap-5'>
                  {/* Displaying all information about the current file */}
                  <FileDescription documentData={documentData} />
                  <div className='w-full mb-5 overflow-hidden relative flex flex-col gap-4 rounded-lg bg-[rgba(255,255,255,0.4)] backdrop-blur-md p-3'>
                    {/* Actions related to the current file */}
                    <FileAction documentData={documentData} />
                    <TabComponentCard
                      documentData={documentData ? [documentData] : []}
                    />
                  </div>
                </div>
              </div>
            ) : (
              // Display message if there is no data available
              <p>Data is not available</p>
            )}
          </div>
        </motion.div>
      </motion.section>
    </Layout>
  );
};

export default DashboardFileDetails;
