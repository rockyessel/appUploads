import React from 'react';
import { motion } from 'framer-motion';
import { fadeAnimation } from '../../../utils/motion';
// import { useSnapshot } from 'valtio';
import { defaultUser} from '../../../utils/state';
import { useAppwriteContext } from '../../../context/app-write';
import { UserProps } from '../../../interface';
import { filteredData } from '../../../utils/functions';
import { BsMusicNoteList } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';
import MediaCard from '../../../components/media-card';
import { Link } from 'react-router-dom';
// interface Props {
// data:any[] | undefined
// }

const MusicScreen = () => {
  const [clicked, setClicked] = React.useState(false);
  // const snap = useSnapshot(screenState);
  const {
    getUser,
    getCurrentUserDocuments,
    setGlobalDocumentData,
    globalDocumentData,
  } = useAppwriteContext();
  const [loading, setLoading] = React.useState(false);
  // const [getAllUserDocuments, setGetAllUserDocuments] = React.useState<{
  //   total: number;
  //   documents: UserDocumentProps[] | [];
  // }>([]);
  const [user, setUser] = React.useState<UserProps>(defaultUser);

  const navigate = useNavigate();

  React.useEffect(() => {
    if (!user) navigate('/');
  }, [navigate, user]);

  const getLoginUserInfo = React.useCallback(async () => {
    try {
      setLoading(true);
      const user_ = await getUser();
      setUser(user_);
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  }, [getUser]);

  React.useEffect(() => {
    getLoginUserInfo();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  React.useEffect(() => {
    const getAllUserDocuments = async () => {
      if (user) {
        const allCurrentUserDocuments = await getCurrentUserDocuments(
          user?.$id
        );

        console.log('allCurrentUserDocuments', allCurrentUserDocuments);
        setGlobalDocumentData(
          filteredData(allCurrentUserDocuments?.documents, 'audio')
        );
      }
    };
    getAllUserDocuments();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const audioTitle = 'Audio title can be very long'.slice(0, 18).concat('...');

  return (
    <motion.div
      {...fadeAnimation}
      className='bg-gray-50 w-full h-full overflow-y-auto p-3'
    >
      {loading && 'getting user data'}
      <Link to={`/dashboard/sdj943UBIhgi_9hj`}>
        <motion.div className='flex flex-wrap gap-2'>
          <motion.div className='relative flex-col rounded-lg bg-white border-[1px] border-gray-300 gap-4 w-40 h-32 inline-flex items-center justify-center'>
            <span className='absolute top-2 right-1 inline-flex items-center justify-center rounded-lg text-sm p-1'>
              <span
                className='z-20 bg-white border-[1px] p-1 rounded-lg'
                onClick={() => setClicked((prev) => !prev)}
              >
                {clicked ? 'X' : '...'}
              </span>
              {clicked && (
                <span className='top-0 border-[1px] border-gray-300 w-40 right-0 h-32 flex flex-col gap-2 p-2 rounded-lg z-10 absolute bg-gray-50'>
                  <span className='w-full hover:bg-white border-[1px] border-transparent hover:border-[1px] hover:border-gray-300 px-2 py-1 rounded-lg'>
                    View
                  </span>
                  <span className='w-full hover:bg-white border-[1px] border-transparent hover:border-[1px] hover:border-gray-300 px-2 py-1 rounded-lg'>
                    Share
                  </span>
                  <span className='w-full hover:bg-white border-[1px] border-transparent hover:border-[1px] hover:border-gray-300 px-2 py-1 rounded-lg'>
                    Delete
                  </span>
                </span>
              )}
            </span>
            <div>
              <BsMusicNoteList className='text-xl' />
            </div>
            <span className='absolute bottom-2 rounded-lg bg-gray-50 text-sm px-2 py-1'>
              {audioTitle}
            </span>
          </motion.div>
        </motion.div>
      </Link>
      <motion.div className='flex flex-wrap gap-2'>
        {globalDocumentData?.map((data, index) => (
          <MediaCard
            svgElementContent={''}
            data={data}
            key={index}
            extension={`${data?.mimeType?.split('/').shift()} ${
              data?.extension
            }`}
            value={''}
          />
        ))}
      </motion.div>
    </motion.div>
  );
};

export default MusicScreen;
