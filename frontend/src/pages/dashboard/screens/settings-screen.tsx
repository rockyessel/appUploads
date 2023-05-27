// import React from 'react'
import { motion } from 'framer-motion';
import { slideAnimation } from '../../../utils/motion';
// interface Props {}

const SettingsScreen = () => {
  return <motion.div {...slideAnimation('up')}>SettingsScreen</motion.div>;
};

export default SettingsScreen;
