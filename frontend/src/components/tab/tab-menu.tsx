import React from 'react';
import { motion } from 'framer-motion';
import { tabMenu } from '../../utils/constant';

interface Props {
  setSelectActiveTab: React.Dispatch<React.SetStateAction<string>>;
  selectActiveTab: string;
}

const TabMenu = (props: Props) => {
  return (
    <motion.ul className='tabs text-medium'>
      {tabMenu.map((menu, index) => (
        <motion.li
          key={index}
          onClick={() => props?.setSelectActiveTab(`${menu.name}`)}
          className={`tab tab-lifted ${
            props?.selectActiveTab === menu.name && 'tab-active text-bold'
          }`}
        >
          {menu.title}
        </motion.li>
      ))}
    </motion.ul>
  );
};

export default TabMenu;
