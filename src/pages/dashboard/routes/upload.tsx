import React from 'react';
import { motion } from 'framer-motion';
import Layout from '../../../components/dashboard/layout';
import UploadScreen from '../../home/screens/upload-screen';
import LoadingScreen from '../../home/screens/loading-screen';
import FileScreen from '../../home/screens/file-screen';

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
