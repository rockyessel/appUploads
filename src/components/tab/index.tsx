import React from 'react';
import { motion } from 'framer-motion';
import TabRender from './tab-render';
import { UserDocumentProps } from '../../interface';
import TabMenu from './tab-menu';

interface Props {
  documentData: UserDocumentProps[];
}

const TabComponentCard = (props: Props) => {
  const [selectActiveTab, setSelectActiveTab] = React.useState('link');
  return (
    <motion.div className='w-full flex flex-col gap-4'>
      <TabMenu
        selectActiveTab={selectActiveTab}
        setSelectActiveTab={setSelectActiveTab}
      />
      <TabRender
        documentsData={props.documentData}
        selectActiveTab={selectActiveTab}
      />
    </motion.div>
  );
};

export default TabComponentCard;
