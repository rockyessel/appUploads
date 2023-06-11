import { motion } from 'framer-motion';
import React from 'react';

interface Props {
  children: React.ReactNode;
  size: string;
}

const TabContentCard = (props: Props) => {
  return (
    <motion.div className={`w-full h-auto text-gray-50`}>
      <motion.pre className={`${props.size}`}>{props.children}</motion.pre>
    </motion.div>
  );
};

export default TabContentCard;
