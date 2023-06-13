// import React from 'react';
import { formatFileSize } from '../../utils/functions';
import { FaTimes } from 'react-icons/fa';
import Button from '../button';
import { motion } from 'framer-motion';
import { useAppwriteContext } from '../../context/app-write';

interface Props {
  file: File;
}

const FileItem = (props: Props) => {
  const { handleRemoveFile } = useAppwriteContext();

  const title =
    props?.file?.name.length > 7
      ? props?.file?.name
          ?.slice(0, 7)
          .concat(`...${props?.file?.name.split('.').pop()}`)
      : props?.file?.name;

  return (
    <motion.div
      className={`w-full bg-[rgb(255,255,255,0.5)] dark:bg-[rgb(180,173,173,0.5)] backdrop-blur-lg border-[1px] rounded-lg flex items-center justify-between p-3`}
    >
      <motion.span className='font-medium'>{title}</motion.span>
      <motion.span className='inline-flex items-center gap-2'>
        <motion.span className='hidden sm:block'>
          {formatFileSize(props.file.size)}
        </motion.span>
        <Button
          styles={
            'border-[1px] sm:p-2 rounded-lg bg-transparent hover:bg-rose-500 hover:text-gray-200 cursor-pointer active:ring-2 active:ring-rose-600 active:bg-rose-600 active:border-2 transition-all ease-in-out active:border-white active:text-black'
          }
          title={'Clear'}
          handleClick={() => handleRemoveFile(props.file.name)}
        >
          <FaTimes />
        </Button>
      </motion.span>
    </motion.div>
  );
};

export default FileItem;
