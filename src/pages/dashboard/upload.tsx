import { motion } from 'framer-motion';
import Layout from '../../components/dashboard/layout';
import { FileScreen, LoadingScreen, UploadScreen } from '../screens';

const UserFilesUpload = () => {
  return (
    <Layout>
      <motion.div className='w-full h-full overflow-y-auto flex items-center justify-center bg-[rgb(255,255,255,0.1)] backdrop:blur-lg shadow-lg'>
        <UploadScreen />
        <LoadingScreen />
        <FileScreen />
      </motion.div>
    </Layout>
  );
};

export default UserFilesUpload;
