import React from 'react';
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
import { toast } from 'react-toastify';

interface Props {
  documentData: UserDocumentProps;
}

const FileAction = (props: Props) => {
  const [isChecked, setIsChecked] = React.useState<boolean>(
    props.documentData.public
  );

  const { updateDocuments } = useAppwriteContext();
  const navigate = useNavigate();

  const handleUpdate = React.useMemo(
    () => () => {
      try {
        if (props.documentData) {
          updateDocuments(props.documentData?.$id, isChecked);
          isChecked
            ? toast.warn('Access: Anyone')
            : toast.success('Access: Only You');
        }
      } catch (error) {
        console.log(error);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [isChecked, updateDocuments]
  );

  React.useEffect(() => {
    handleUpdate();
  }, [handleUpdate]);

  const { deleteFrom_db_bucket } = useAppwriteContext();

  const handleDelete = async () => {
    await deleteFrom_db_bucket(`${props.documentData?.$id}`);
    navigate(-1);
    screenState.dashboardScreen.default = true;
  };

  const handlePublicToggle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsChecked(event.target.checked);
  };

  return (
    <motion.div className='w-full inline-flex items-center gap-5 lg:gap-10 text-sm'>
      <div className='inline-flex items-center gap-2'>
        <a href={`${props.documentData?.view}`} target='_blank' rel='noopener'>
          <Button styles={''} title={'View'}>
            <span className='hidden md:block'> View</span> <TbView360 />
          </Button>
        </a>
        <Button
          styles={'w-full inline-flex items-center'}
          title={'Visibility mode'}
        >
          <span className='hidden md:flex'>Public</span>
          <input
            onChange={handlePublicToggle}
            type='checkbox'
            checked={isChecked}
            className={`toggle ${isChecked ? 'bg-green-800' : 'bg-rose-800'}`}
          />
        </Button>
        <Button
          handleClick={() =>
            downloadFile(`${props?.documentData?.view}`, `${props?.documentData?.$id}`)}
          styles={''}
          title={'Download'}>
          <span className='hidden md:block'>Download</span> <HiDownload />
        </Button>
      </div>
      <Button styles={''} title={'Delete'} handleClick={handleDelete}>
        <span className='hidden md:block'>Delete</span>
        <GiTimeDynamite className='text-red-500' />
      </Button>
    </motion.div>
  );
};

export default FileAction;
