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
    props.documentData?.public
  );

  // Access the 'updateDocuments' function from the Appwrite context
  const { updateDocuments } = useAppwriteContext();

  // Access the 'navigate' function from the router library
  const navigate = useNavigate();

  // Define a memoized version of the 'handleUpdate' function
  const handleUpdate = React.useMemo(
    () => () => {
      try {
        // Check if 'props.documentData' exists
        if (props.documentData) {
          // Call the 'updateDocuments' function with the document ID and 'isChecked' value
          updateDocuments(props.documentData?.$id, isChecked);

          // Display a toast message based on the 'isChecked' value
          isChecked
            ? toast.warn('Access: Anyone')
            : toast.success('Access: Only You');
        }
      } catch (error) {
        console.log(error);
      }
    },
    // Update 'handleUpdate' whenever 'isChecked' or 'updateDocuments' changes
    [isChecked, props.documentData, updateDocuments]
  );

  // Call 'handleUpdate' once during component mount
  React.useEffect(() => {
    handleUpdate();
  }, [handleUpdate]);

  // Access the 'deleteFrom_db_bucket' function from the Appwrite context
  const { deleteFrom_db_bucket } = useAppwriteContext();

  // Handle the deletion of the document
  const handleDelete = async () => {
    // Delete the document from the database and bucket
    await deleteFrom_db_bucket(`${props.documentData?.$id}`);

    // Navigate back to the previous page
    navigate(-1);

    // Set the 'default' value to true in the dashboard screen state
    screenState.dashboardScreen.default = true;
  };

  // Handle the toggle of the public access checkbox
  const handlePublicToggle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsChecked(event.target.checked);
  };

  return (
    <motion.div className='w-full inline-flex items-center gap-5 lg:gap-10 text-sm'>
      {/* View Button */}
      <div className='inline-flex items-center gap-2'>
        <a href={`${props.documentData?.view}`} target='_blank' rel='noopener'>
          <Button styles={''} title={'View'}>
            <span className='hidden md:block'> View</span> <TbView360 />
          </Button>
        </a>

        {/* Visibility Mode Button */}
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

        {/* Download Button */}
        <Button
          handleClick={() =>
            downloadFile(
              `${props?.documentData?.view}`,
              `${props?.documentData?.$id}`
            )
          }
          styles={''}
          title={'Download'}
        >
          <span className='hidden md:block'>Download</span> <HiDownload />
        </Button>
      </div>

      {/* Delete Button */}
      <Button styles={''} title={'Delete'} handleClick={handleDelete}>
        <span className='hidden md:block'>Delete</span>
        <GiTimeDynamite className='text-red-500' />
      </Button>
    </motion.div>
  );
};

export default FileAction;
