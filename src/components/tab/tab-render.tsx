import { motion } from 'framer-motion';
import { UserDocumentProps } from '../../interface';
import TabContentCard from './content-card';

interface Props {
  selectActiveTab: string;
  documentsData: UserDocumentProps[];
}

const TabRender = (props: Props) => {
  switch (props?.selectActiveTab) {
    case 'link':
      return (
        <TabContentCard>
          {props?.documentsData?.map((document, index) => (
            <motion.code className='w-full' key={index}>
              {document?.view}
            </motion.code>
          ))}
        </TabContentCard>
      );
    case 'html-code':
      return (
        <TabContentCard>
          {props?.documentsData?.map((document, index) => (
            <motion.code
              className='w-full'
              key={index}
            >{`<a href=${document?.view} target="_blank"></a>`}</motion.code>
          ))}
        </TabContentCard>
      );

    default:
      return (
        <TabContentCard>
          {props?.documentsData?.map((document, index) => (
            <motion.code className='w-full' key={index}>
              {`[URL=${document?.$id}][IMG]${document?.view}[/IMG][/URL]`}
            </motion.code>
          ))}
        </TabContentCard>
      );
  }
};

export default TabRender;
