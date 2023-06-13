import { motion } from 'framer-motion';
import React from 'react';

interface Props {
  children: React.ReactNode;
}

const TabContentCard = (props: Props) => {
  return (
    <motion.div className={`w-full h-auto text-gray-50 dark:text-black/90`}>
      <motion.pre className={`h-auto p-3`}>{props.children}</motion.pre>
    </motion.div>
  );
};

export default TabContentCard;
