import React from 'react';
import Layout from '../../../components/dashboard/layout';
import { groupDocumentDataByInterval } from '../../../utils/functions';
import { useAppwriteContext } from '../../../context/app-write';
import { UserDocumentProps, UserProps } from '../../../interface';
import MediaCard from '../../../components/media-card';
import { format } from 'date-fns';
import { SlArrowUp, SlArrowDown } from 'react-icons/sl';
import { dayMonthYear } from '../../../utils/constant';

const DashboardRecentDocuments = () => {
  // Define state variables
  const [activeGroup, setActiveGroup] = React.useState(''); // Keeps track of the currently active group
  const [userDocumentData, setUserDocumentData] = React.useState<UserDocumentProps[] | []>([]); // Stores user document data
  const [loading, setLoading] = React.useState(false); // Indicates whether the data is currently being loaded

  const [timeInterval, setTimeInterval] = React.useState('day'); // Stores the selected time interval
  const [selectedIntervalState, setSelectedIntervalState] = React.useState(false); // Tracks the state of the selected time interval
  const { getCurrentUserDocuments } = useAppwriteContext(); // Custom hook to get the user's documents

  // Function to toggle the active group
  const toggleGroup = (date: string) => {
    setActiveGroup((prevGroup) => (prevGroup === date ? '' : date)); // If the clicked group is already active, set it to an empty string (deactivate), otherwise set it to the clicked group (activate)
  };

  // Memoized function to fetch user documents
  const getUserDocuments = React.useMemo(
    () => async () => {
      setLoading(true); // Set loading state to true
      const getUserFromLocalStorage = window.localStorage.getItem('user'); // Get the user data from local storage
      const user: UserProps = JSON.parse(`${getUserFromLocalStorage}`); // Parse the user data
      if (user) {
        const data = await getCurrentUserDocuments(user.$id); // Fetch the user's documents using the getCurrentUserDocuments function
        setUserDocumentData(data.documents); // Update the user document data state with the fetched documents
      }
      setLoading(false); // Set loading state to false after fetching and updating the data
    },
    [getCurrentUserDocuments]
  );

  React.useEffect(() => {
    // Fetch user documents when the component mounts
    getUserDocuments();
  }, [getUserDocuments]);

  // Function to handle interval change
  const handleIntervalChange = (selectedFrame: string) => {
    setTimeInterval(selectedFrame); // Update the selected time interval state with the newly selected value
    setSelectedIntervalState((prev) => !prev); // Toggle the state of the selected time interval (used to trigger re-rendering)
  };

  // Group user document data by selected time interval
  const groupedFiles = React.useMemo(() => {
    if (userDocumentData) {
      return groupDocumentDataByInterval(userDocumentData, timeInterval); // Use a helper function (groupDocumentDataByInterval) to group the user document data based on the selected time interval
    }
    return {}; // If there is no user document data, return an empty object
  }, [timeInterval, userDocumentData]);

  console.log('entries', Object.entries(groupedFiles)); // Log the entries (key-value pairs) of the groupedFiles object

  return (
    <Layout>
      <div className='bg-[rgb(255,255,255,0.2)]  backdrop-blur-md w-full h-full overflow-y-auto p-3'>
        <div>
          {/* Section displaying the header */}
          <div className='bg-[rgb(255,255,255,0.4)] w-full h-auto px-4 py-2.5 rounded-lg relative flex flex-wrap items-center justify-between'>
            <p className='text-sm md:text-md font-medium w-fit'>
              Freely check your most recent files uploaded here.
            </p>

            {/* Section for selecting the time interval */}
            <span className='bg-[rgb(255,255,255,0.4)] w-full md:w-fit h-auto px-4 py-2.5 rounded-lg relative'>
              <span
                className='w-full capitalize inline-flex justify-between items-center gap-2'
                onClick={() => handleIntervalChange('')}
              >
                <span>{timeInterval ? timeInterval : 'Choose'} </span>
                <span>
                  {selectedIntervalState ? <SlArrowUp /> : <SlArrowDown />}
                </span>
              </span>
              <span className='w-full'>
                {selectedIntervalState && (
                  <span className='flex flex-col absolute bg-[rgb(255,255,255,0.9)] px-4 py-2 right-0 top-12 rounded-lg'>
                    {dayMonthYear.map((period, index) => (
                      <span
                        key={index}
                        className='py-1 cursor-pointer capitalize'
                        onClick={() => handleIntervalChange(`${period.name}`)}
                      >
                        {period.name}
                      </span>
                    ))}
                  </span>
                )}
              </span>
            </span>
          </div>

          {/* Section displaying grouped files */}
          <div className='mt-10'>
            {Object.entries(groupedFiles).map(([date, files]) => (
              <div className='flex flex-col gap-2' key={date}>
                {/* Group header */}
                <h3
                  className='flex items-center justify-between w-full h-auto px-4 py-2.5 rounded-lg bg-[rgb(255,255,255,0.5)]'
                  onClick={() => toggleGroup(date)}
                >
                  <span>{format(new Date(date), 'do MMMM Y')} </span>
                  <span>
                    {activeGroup === date ? <SlArrowUp /> : <SlArrowDown />}
                  </span>
                </h3>
                <div className='flex flex-wrap gap-2'>
                  {/* List of files within the group */}
                  {activeGroup === date && (
                    <ul className='flex flex-wrap gap-2 items-center'>
                      {files.map((file, index_) => (
                        <MediaCard
                          key={index_}
                          data={file}
                          extension={`${file?.mimeType?.split('/').shift()} ${
                            file?.extension
                          }`}
                        />
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            ))}

            {/* Display loading state or no files found message */}
            {loading ? (
              <p>Loading</p>
            ) : (
              Object.entries(groupedFiles).length === 0 && (
                <>
                  <p>No documents or files found here yet.</p>
                  <p>Come back after you have uploaded a file.</p>
                </>
              )
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default DashboardRecentDocuments;
