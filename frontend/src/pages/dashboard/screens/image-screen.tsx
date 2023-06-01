import React from 'react';
import { motion } from 'framer-motion';
import { headContainerAnimation } from '../../../utils/motion';
import MediaCard from '../../../components/media-card';
import { useAppwriteContext } from '../../../context/app-write';
import { UserProps } from '../../../interface';
import { filteredData } from '../../../utils/functions';

const ImageScreen = () => {
  const { getCurrentUserDocuments, setGlobalDocumentData, globalDocumentData } =
    useAppwriteContext();

  const getAllUserDocuments = React.useCallback(async (userId: string) => {
    if (userId) {
      const allCurrentUserDocuments = await getCurrentUserDocuments(userId);
      console.log('allCurrentUserDocuments', allCurrentUserDocuments);
      setGlobalDocumentData(
        filteredData(allCurrentUserDocuments?.documents, 'image')
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  React.useEffect(() => {
    const getUserFromLocalStorage = window.localStorage.getItem('user');
    const user: UserProps = JSON.parse(`${getUserFromLocalStorage}`);
    if (user) {
      getAllUserDocuments(user.$id);
    }
  }, [getAllUserDocuments]);

  return (
    <motion.div
      {...headContainerAnimation}
      className='bg-transparent w-full h-full overflow-y-auto p-3'
    >
      <motion.div className='flex flex-wrap gap-2'>
        {globalDocumentData?.map((data, index) => (
          <MediaCard
            data={data}
            key={index}
            extension={`${data?.mimeType?.split('/').shift()} ${
              data?.extension
            }`}
            value={''}
            svgElementContent={''}
          />
        ))}
      </motion.div>
    </motion.div>
  );
};

export default ImageScreen;
