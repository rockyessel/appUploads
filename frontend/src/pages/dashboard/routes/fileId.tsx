import React from 'react';
import Layout from '../../../components/dashboard/layout';
import { screenState } from '../../../utils/state';
import { motion } from 'framer-motion';
import { fadeAnimation } from '../../../utils/motion';

interface Props {}

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
        className='bg-gray-50 w-full h-full overflow-y-auto p-3'
      >
        Hello, motherufucker
      </motion.div>
    </Layout>
  );
};

export default DashboardFileDetails;
