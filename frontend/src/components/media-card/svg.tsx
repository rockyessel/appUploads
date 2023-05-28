import React from 'react';
import { motion } from 'framer-motion';
import { UserDocumentProps } from '../../interface';

interface Props {
  documentData?: UserDocumentProps;
}

const SvgCard = (props: Props) => {
  const [svgContent, setSvgContent] = React.useState('');

  console.log('SVGCard', props);

  const getSVGElement = React.useCallback(async () => {
    const fetchSVG = await fetch(`${props?.documentData?.view}`);

    if (fetchSVG.ok) {
      const svgData = await fetchSVG.text();
      setSvgContent(svgData);
    }
  }, [props?.documentData?.view]);

  React.useEffect(() => {
    if (props?.documentData?.extension === 'svg') {
      getSVGElement();
    }
  }, [props?.documentData, getSVGElement]);
  return (
    <motion.div className='w-[50rem] text-7xl bg-gray-50 h-[20rem] overflow-hidden rounded-lg flex items-center px-10 border-[1px]'>
      {svgContent ? (
        <span
          className='w-full'
          dangerouslySetInnerHTML={{ __html: svgContent }}
        ></span>
      ) : (
        'fjfjfjfjfjfjfjjfjfjfjfjfjf'
      )}
    </motion.div>
  );
};

export default SvgCard;
