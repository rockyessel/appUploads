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
    <motion.div className='w-40 h-32 bg-gray-50 overflow-hidden rounded-lg flex items-center justify-center border-[1px]'>
      {svgContent ? (
        <motion.div
          className='w-full h-full inline-flex items-center justify-center'
          dangerouslySetInnerHTML={{ __html: svgContent }}
        ></motion.div>
      ) : (
        'SVG'
      )}
    </motion.div>
  );
};

export default SvgCard;
