import React from 'react';
import { motion } from 'framer-motion';

interface Props {}

const SvgCard = (props) => {
  const [svgContent, setSvgContent] = React.useState('');

  const getSVGElement = React.useCallback(async () => {
    const fetchSVG = await fetch(`${props?.view}`);

    if (fetchSVG.ok) {
      const svgData = await fetchSVG.text();
      setSvgContent(svgData);
    }
  }, [props?.view]);

  React.useEffect(() => {
    if (props?.document?.extension === 'svg') {
      getSVGElement();
    }
  }, [props?.document, getSVGElement]);
  return (
    <motion.div className='w-full bg-gray-50 h-[20rem] overflow-hidden rounded-lg flex items-center px-10 border-[1px]'>
      <span
        className='w-full'
        dangerouslySetInnerHTML={{ __html: svgContent }}
      ></span>
    </motion.div>
  );
};

export default SvgCard;
