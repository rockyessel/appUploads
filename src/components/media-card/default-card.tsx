import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { UserDocumentProps } from '../../interface';
import { assignedIconExtensions } from '../../utils/constant';
import { RiCloseLine } from 'react-icons/ri';
import { CiCircleMore } from 'react-icons/ci';

interface Props {
  documentData: UserDocumentProps;
  documentType: string;
  size?: string;
}

const ApplicationDefaultCard = (props: Props) => {
  const [clicked, setClicked] = React.useState(false);

  const title =
    props?.documentData?.filename.length > 12
      ? props?.documentData?.filename
          ?.slice(0, 12)
          .concat(`...${props?.documentData?.extension}`)
      : props?.documentData?.filename;

  return (
    <motion.div
      className={`${
        props.size ? props.size : 'w-40 h-32'
      } relative flex-col bg-[rgb(255,255,255,0.1)]  border-[1px] border-gray-300 gap-4 inline-flex items-center justify-center`}
    >
      <motion.span className='absolute top-2 right-1 inline-flex items-center justify-center rounded-lg text-sm p-1'>
        {props.size ? null : (
          <motion.span
            className='z-20 bg-[rgb(255,255,255,0.5)] backdrop-blur-lg border-[1px] p-1 rounded-lg'
            onClick={() => setClicked((prev) => !prev)}
          >
            {clicked ? (
              <RiCloseLine className='text-xl' />
            ) : (
              <CiCircleMore className='text-xl' />
            )}
          </motion.span>
        )}
        {clicked && (
          <motion.span className='top-0 border-[1px] border-gray-300 w-40 right-0 h-32 flex flex-col gap-2 p-2 rounded-lg z-10 absolute bg-[rgba(255,255,255,0.5)] backdrop-blur-md'>
            <Link
              to={`/dashboard/${props.documentType}/${props.documentData.$id}`}
              className='w-full hover:bg-white border-[1px] border-transparent hover:border-[1px] hover:border-gray-300 px-2 py-1 rounded-lg'
            >
              <motion.span>View</motion.span>
            </Link>
            <motion.span className='w-full hover:bg-white border-[1px] border-transparent hover:border-[1px] hover:border-gray-300 px-2 py-1 rounded-lg'>
              Share
            </motion.span>
            <motion.span className='w-full hover:bg-white border-[1px] border-transparent hover:border-[1px] hover:border-gray-300 px-2 py-1 rounded-lg'>
              Delete
            </motion.span>
          </motion.span>
        )}
      </motion.span>
      <motion.div>
        {assignedIconExtensions[`${props.documentData.extension}`]}
      </motion.div>
      {props.size ? null : (
        <motion.span className='absolute bottom-1 rounded-lg text-sm px-2 py-1 bg-[rgb(255,255,255,0.5)] backdrop-blur-lg'>
          {title}
        </motion.span>
      )}
    </motion.div>
  );
};

export default ApplicationDefaultCard;
