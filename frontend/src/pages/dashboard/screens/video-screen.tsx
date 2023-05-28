import React from 'react';
import { motion } from 'framer-motion';
import { fadeAnimation } from '../../../utils/motion';
import { BsPlayCircle } from 'react-icons/bs';
import { useAppwriteContext } from '../../../context/app-write';
import MediaCard from '../../../components/media-card';
import { filteredData } from '../../../utils/functions';
import { defaultUser, screenState } from '../../../utils/state';
import { useSnapshot } from 'valtio';
import { useNavigate } from 'react-router-dom';
import { UserProps } from '../../../interface';
// interface Props {}

const VideoScreen = () => {
  const snap = useSnapshot(screenState);
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
  }, []);

  React.useEffect(() => {
    const getAllUserDocuments = async () => {
      if (user) {
        const allCurrentUserDocuments = await getCurrentUserDocuments(
          user?.$id
        );

        console.log('allCurrentUserDocuments', allCurrentUserDocuments);
        setGlobalDocumentData(
          filteredData(allCurrentUserDocuments?.documents, 'video')
        );
      }
    };
    getAllUserDocuments();
  }, [user]);

  return (
    <motion.div
      {...fadeAnimation}
      className='bg-gray-50 w-full h-full overflow-y-auto p-3'
    >
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

export default VideoScreen;
