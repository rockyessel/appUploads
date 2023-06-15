import React from 'react';
import { motion } from 'framer-motion';
import { BsPlayCircle } from 'react-icons/bs';
import { CiCircleMore } from 'react-icons/ci';
import { RiCloseLine } from 'react-icons/ri';
import { Link } from 'react-router-dom';
import { UserDocumentProps } from '../../../interface';
import { MdOutlineSmartDisplay } from 'react-icons/md';

interface Props {
  documentData: UserDocumentProps;
  size?: string;
}

const VideoCard = (props: Props) => {
  const [clicked, setClicked] = React.useState(false);
  return (
    <motion.div
      className={`${
        props.size ? props.size : 'w-40 h-32'
      } relative flex-col bg-[rgb(255,255,255,0.1)]  border-[1px] border-gray-300 gap-4 inline-flex items-center justify-center`}
    >
      {props?.documentData ? (
        <video
          className='w-full h-full object-cover object-center rounded-lg'
          src={props?.documentData?.view}
          controls={false}
        />
      ) : (
        <MdOutlineSmartDisplay />
      )}
      <span className='absolute top-1 right-1 inline-flex items-center justify-center rounded-lg text-sm p-1'>
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
          <span className='top-0 border-[1px] border-gray-300 w-40 right-0 h-32 flex flex-col gap-2 p-2 rounded-lg z-10 absolute bg-[rgba(255,255,255,0.5)] backdrop-blur-md'>
            <Link
              to={`/dashboard/video/${props.documentData.$id}`}
              className='w-full hover:bg-white border-[1px] border-transparent hover:border-[1px] hover:border-gray-300 px-2 py-1 rounded-lg'
            >
              <span>View</span>
            </Link>
            <span className='w-full hover:bg-white border-[1px] border-transparent hover:border-[1px] hover:border-gray-300 px-2 py-1 rounded-lg'>
              Lock
            </span>
            <span className='w-full hover:bg-white border-[1px] border-transparent hover:border-[1px] hover:border-gray-300 px-2 py-1 rounded-lg'>
              Delete
            </span>
          </span>
        )}
      </span>

      <span className='absolute bottom-2 rounded-lg bg-slate-800 text-gray-50/70 text-sm px-2 py-1'>
        {props?.documentData?.filename
          ?.slice(0, 12)
          .concat(`...${props?.documentData?.extension}`)}
      </span>
      <span className='absolute top-2 left-1 inline-flex items-center justify-center  bg-slate-800 text-gray-50/70 border-[1px] p-1 rounded-lg'>
        <BsPlayCircle className='text-lg' />
      </span>
    </motion.div>
  );
};

export default VideoCard;
