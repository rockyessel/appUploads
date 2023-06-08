import React from 'react';
import Layout from '../../../components/dashboard/layout';
import { groupDocumentDataByInterval } from '../../../utils/functions';
import { useAppwriteContext } from '../../../context/app-write';
import { UserDocumentProps, UserProps } from '../../../interface';
import MediaCard from '../../../components/media-card';
import { format } from 'date-fns';
import { SlArrowUp, SlArrowDown } from 'react-icons/sl';
// interface Props {}

const DashboardRecentDocuments = () => {
  const [activeGroup, setActiveGroup] = React.useState('');
  const [userDocumentData, setUserDocumentData] = React.useState<
    UserDocumentProps[] | []
  >([]);
  const [loading, setLoading] = React.useState(false);

  const [timeInterval, setTimeInterval] = React.useState('day');
  const [selectedIntervalState, setSelectedIntervalState] =
    React.useState(false);
  const { getCurrentUserDocuments } = useAppwriteContext();

  const toggleGroup = (date: string) => {
    console.log('date', date);
    setActiveGroup((prevGroup) => (prevGroup === date ? '' : date));
  };

  const getUserDocuments = React.useMemo(
    () => async () => {
      setLoading(true);
      const getUserFromLocalStorage = window.localStorage.getItem('user');
      const user: UserProps = JSON.parse(`${getUserFromLocalStorage}`);
      if (user) {
        const data = await getCurrentUserDocuments(user.$id);
        setUserDocumentData(data.documents);
      }
      setLoading(false);
    },
    [getCurrentUserDocuments]
  );
  React.useEffect(() => {
    getUserDocuments();
    // groupDocumentDataByInterval(userDocumentData?.documents);
  }, [getUserDocuments]);

  const handleIntervalChange = (selectedFrame: string) => {
    setTimeInterval(selectedFrame);
    setSelectedIntervalState((prev) => !prev);
  };

  const groupedFiles = React.useMemo(() => {
    if (userDocumentData) {
      return groupDocumentDataByInterval(userDocumentData, timeInterval);
    }
    return {};
  }, [timeInterval, userDocumentData]);

  console.log('entries', Object.entries(groupedFiles));

  return (
    <Layout>
      <div className='bg-[rgb(255,255,255,0.2)]  backdrop-blur-md w-full h-full overflow-y-auto p-3'>
        <div>
          <div className='bg-[rgb(255,255,255,0.4)] w-full h-auto px-4 py-2.5 rounded-lg relative flex flex-wrap items-center justify-between'>
            <p className='text-sm md:text-md font-medium w-fit'>
              Freely check your most recent files uploaded here.
            </p>

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
                    <span
                      className='py-1 cursor-pointer'
                      onClick={() => handleIntervalChange('day')}
                    >
                      Day
                    </span>
                    <span
                      className='py-1 cursor-pointer'
                      onClick={() => handleIntervalChange('week')}
                    >
                      Week
                    </span>
                    <span
                      className='py-1 cursor-pointer'
                      onClick={() => handleIntervalChange('month')}
                    >
                      Month
                    </span>
                    <span
                      className='py-1 cursor-pointer'
                      onClick={() => handleIntervalChange('year')}
                    >
                      Year
                    </span>
                  </span>
                )}
              </span>
            </span>
          </div>

          <div className='mt-10'>
            {Object.entries(groupedFiles).map(([date, files]) => (
              <div className='flex flex-col gap-2' key={date}>
                <h3
                  className=' flex items-center justify-between w-full h-auto px-4 py-2.5 rounded-lg bg-[rgb(255,255,255,0.5)]'
                  onClick={() => toggleGroup(date)}
                >
                  <span>{format(new Date(date), 'do MMMM Y')} </span>
                  <span>
                    {activeGroup === date ? <SlArrowUp /> : <SlArrowDown />}
                  </span>
                </h3>
                <div className='flex flex-wrap gap-2'>
                  {activeGroup === date && (
                    <ul className='flex flex-wrap gap-2 items-center'>
                      {files.map((file, index_) => (
                        <MediaCard
                          key={index_}
                          data={file}
                          extension={`${file?.mimeType?.split('/').shift()} ${
                            file?.extension
                          }`}
                          value={''}
                          svgElementContent={''}
                        />
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            ))}

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
