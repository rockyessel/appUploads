import React from 'react';
import Layout from '../../../components/dashboard/layout';
import { screenState } from '../../../utils/state';
import { motion } from 'framer-motion';
import { fadeAnimation } from '../../../utils/motion';

const DashboardFileDetails = () => {
  React.useEffect(() => {
    screenState.dashboardScreen.settings = false;
    screenState.dashboardScreen.music = false;
    screenState.dashboardScreen.application = false;
    screenState.dashboardScreen.document = false;
    screenState.dashboardScreen.generative = false;
    screenState.dashboardScreen.image = false;
    screenState.dashboardScreen.video = false;
  }, []);

  return (
    <Layout>
      <motion.div
        {...fadeAnimation}
        className='bg-transparent w-full h-full overflow-y-auto p-3'
      >
        <div className='w-full h-[25rem] rounded-lg shadow-lg bg-transparent-500'></div>
        <div className='flex flex-col gap-2'>
          <p className='flex flex-col'>
            <span>Filename</span>
            <span>the-girl-who-die-on.mp4</span>
          </p>
          <p className='flex flex-col'>
            <span>File Extension</span>
            <span>MP4</span>
          </p>
          <p className='flex flex-col'>
            <span>File Size</span>
            <span>324.43MB</span>
          </p>
        </div>
      </motion.div>
    </Layout>
  );
};

export default DashboardFileDetails;
