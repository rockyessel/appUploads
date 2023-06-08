// import React from 'react';
import { GiTimeDynamite } from 'react-icons/gi';
import Button from './button';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { UserDocumentProps } from '../interface';
import { useAppwriteContext } from '../context/app-write';
import { downloadFile } from '../utils/functions';
import { HiDownload } from 'react-icons/hi';
import { TbView360 } from 'react-icons/tb';
import { screenState } from '../utils/state';

interface Props {
  documentData?: UserDocumentProps;
}

const FileAction = (props: Props) => {
  const navigate = useNavigate();

  const { deleteFrom_db_bucket } = useAppwriteContext();

  const handleDelete = async () => {
    await deleteFrom_db_bucket(`${props.documentData?.$id}`);
    navigate(-1);
    screenState.dashboardScreen.default = true;
  };

  return (
    <motion.div className='w-full inline-flex items-center gap-20 text-sm'>
      <div className='inline-flex items-center gap-2'>
        <a href={`${props.documentData?.view}`} target='_blank' rel='noopener'>
          <Button styles={''} title={'View file'}>
            <span className='hidden md:block'> View File</span> <TbView360 />
          </Button>
        </a>
        <Button
          handleClick={() =>
            downloadFile(
              `${props?.documentData?.view}`,
              `${props?.documentData?.filename}`
            )
          }
          styles={''}
          title={'Download'}
        >
          <span className='hidden md:block'>Download</span> <HiDownload />
        </Button>
      </div>
      <Button styles={''} title={'Share'} handleClick={handleDelete}>
        <span className='hidden md:block'>Delete</span>
        <GiTimeDynamite className='text-red-500' />
      </Button>
    </motion.div>
  );
};

export default FileAction;
