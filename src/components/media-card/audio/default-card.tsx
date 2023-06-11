import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { BsMusicNoteList } from 'react-icons/bs';
import { UserDocumentProps } from '../../../interface';
import { RiCloseLine } from 'react-icons/ri';
import { CiCircleMore } from 'react-icons/ci';
import { assignedIconExtensions } from '../../../utils/constant';

interface Props {
  documentData: UserDocumentProps;
}

const DefaultAudioCard = (props: Props) => {
  const [clicked, setClicked] = React.useState(false);

  const title =
    props?.documentData?.filename.length > 12
      ? props?.documentData?.filename
          ?.slice(0, 12)
          .concat(`...${props?.documentData?.extension}`)
      : props?.documentData?.filename;

  return (
    <motion.div className='relative flex-col rounded-lg bg-[rgb(255,255,255,0.1)] backdrop-blur-lg border-[1px] border-gray-300 gap-4 w-40 h-32 inline-flex items-center justify-center'>
      <span className='absolute top-2 right-1 inline-flex items-center justify-center rounded-lg text-sm p-1'>
        <span
          className='z-20 bg-[rgb(255,255,255,0.5)] backdrop-blur-lg border-[1px] p-1 rounded-lg'
          onClick={() => setClicked((prev) => !prev)}
        >
          {clicked ? (
            <RiCloseLine className='text-xl' />
          ) : (
            <CiCircleMore className='text-xl' />
          )}
        </span>
        {clicked && (
          <span className='top-0 border-[1px] border-gray-300 w-40 right-0 h-32 flex flex-col gap-2 p-2 rounded-lg z-10 absolute bg-[rgb(255,255,255,0.6)] backdrop-blur-3xl'>
            <Link
              to={`/dashboard/music/${props?.documentData?.$id}`}
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
      <span className='absolute bottom-1 rounded-lg text-sm px-2 py-1 bg-[rgb(255,255,255,0.5)] backdrop-blur-lg'>
        {title}
      </span>
    </motion.div>
  );
};

export default DefaultAudioCard;
