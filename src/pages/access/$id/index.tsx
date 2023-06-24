import React from 'react';
import { motion } from 'framer-motion';
import { useParams } from 'react-router-dom';
import { useAppwriteContext } from '../../../context/app-write';
import { UserDocumentProps } from '../../../interface';
import MediaViewerCard from '../../../components/media-viewer-card';
import { FileDescription, Loader, TabComponentCard, Navbar, Head, Button } from '../../../components';
import FileAction from '../../../components/file/file-action';
import { hasNoValue } from '../../../utils/functions';

const AccessDocumentPage = () => {
  const [documentData, setDocumentData] = React.useState<UserDocumentProps>(); // State variable to store document data
  const [accessCodeValue, setAccessCodeValue] = React.useState(''); // State variable to store access code value
  const [lock, setLock] = React.useState<boolean | undefined>(true); // State variable to indicate if the document is locked or not

  const [loading, setLoading] = React.useState(true); // State variable to indicate if the data is currently being loaded
  const router = useParams(); // Accessing the URL parameters using React Router

  const _$id = router.id; // Extracting the "id" parameter from the URL
//   console.log('_$id', _$id);
  const { getDocumentById } = useAppwriteContext(); // Custom hook to retrieve document by ID

  React.useEffect(() => {
    if (_$id) {
      // If the ID parameter exists
      getDocumentById(_$id).then((res) => setDocumentData(res)); // Retrieve the document data using the ID and update the state
      setLoading(false); // Set loading state to false as data fetching is complete
    }
  }, [_$id, getDocumentById]);

  // Mapping of file extensions to subdirectories for categorization
  const subDirectoryMap: { [key: string]: string } = {
    app: 'application',
    deb: 'application',
    apk: 'application',
    xapk: 'application',
    audio: 'music',
    image: 'image',
    video: 'video',
  };
//   console.log('detailed page', documentData);
//   console.log('lock', lock);

  const handleChecker = () => {
    // Function to handle access code validation
    if (accessCodeValue && documentData) {
      // Check if access code value and document data exist
      const expectedCode = documentData.accessCode;
      if (expectedCode === accessCodeValue) {
        // If the expected code matches the entered code
        setLock(false); // Unlock the document
        const timer = setTimeout(() => {
          setLock(
            documentData && documentData.isPublic && documentData.isLocked
          );
        }, 100000);

        // Clear the timer when the component is unmounted
        return () => clearTimeout(timer);
      }
    }
  };

  const handleSubmission = (event: React.SyntheticEvent) => {
    // Function to handle form submission
    event.preventDefault();
    handleChecker(); // Call the access code checker function
  };

  React.useEffect(() => {
    return setLock(
      documentData && documentData.isPublic && documentData.isLocked
    );
  }, [documentData]);

  const extension = `${documentData?.mimeType.split('/').shift()}`; // Extract the file extension from the document's MIME type
  const subDirectory = subDirectoryMap[extension] || 'document'; // Retrieve the subdirectory based on the extension or default to 'document'

  const noDataFromId = hasNoValue(documentData); // Checking if the documentData has no value
  return (
    <React.Fragment>
      <Head
        MIME='png'
        alt='Homepage - Dnest'
        author_name='Rocky Essel'
        description='Welcome to our Cloud File Storage!'
        image=''
        keywords='Cloud file, file storage, storage, online cloud, file sharing'
        publishedAt={new Date().toISOString()}
        title='Dnest Homepage'
        type='Website'
        updatedAt={new Date().toISOString()}
      />
      <Navbar />
      <main className='w-full h-screen bg-[rgba(255,255,255,0.1)] text-white flex items-center justify-center'>
        {lock ? (
          <div className='flex flex-col'>
            <p className='text-xl max-w-xl text-center'>
              This file is locked by the user, enter access code to view the
              file for 10 minutes
            </p>

            <form
              onSubmit={handleSubmission}
              className='max-w-xl flex flex-col gap-2'
            >
              <input
                value={accessCodeValue}
                onChange={(event) => setAccessCodeValue(event.target.value)}
                type='text'
                className='w-full input'
              />
              <Button type='submit' title='Unlock' styles='text-center'>
                Unlock
              </Button>
            </form>
          </div>
        ) : lock === undefined ? (
          <Loader message='Almost there..' />
        ) : (
          <motion.div className='w-full px-4 pt-32'>
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
                      fileCategory={subDirectory}
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
        )}
      </main>
    </React.Fragment>
  );
};

export default AccessDocumentPage;
