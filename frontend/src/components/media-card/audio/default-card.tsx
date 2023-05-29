import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { BsMusicNoteList } from 'react-icons/bs';
import { UserDocumentProps } from '../../../interface';

interface Props {
  documentData:UserDocumentProps
}

const DefaultAudioCard = (props: Props) => {
  const [clicked, setClicked] = React.useState(false);

  const audioTitle = props?.documentData?.filename
    ?.slice(0, 12)
    .concat(`...${props?.documentData?.extension}`);
  return (
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
            <Link
              to={`/dashboard/${props?.documentData?.$id}`}
              className='w-full hover:bg-white border-[1px] border-transparent hover:border-[1px] hover:border-gray-300 px-2 py-1 rounded-lg'
            >
              <span>View</span>
            </Link>
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
  );
};

export default DefaultAudioCard;
