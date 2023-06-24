import React from 'react';
import { motion } from 'framer-motion';
import { UserDocumentProps } from '../../../interface';
import { CiCircleMore } from 'react-icons/ci';
import { RiCloseLine } from 'react-icons/ri';
import { Link } from 'react-router-dom';

interface Props {
  documentData?: UserDocumentProps;
  size?: string;
}

const SvgCard = (props: Props) => {
  const [svgContent, setSvgContent] = React.useState('');
  const [clicked, setClicked] = React.useState(false);

  // console.log('SVGCard', props);

  const title =
    props?.documentData && props?.documentData?.filename?.length > 12
      ? props?.documentData?.filename
          .slice(0, 12)
          .concat(`...${props?.documentData?.extension}`)
      : props?.documentData?.filename;

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
    <motion.div
      className={`${
        props.size ? props.size : 'w-40 h-32 '
      } bg-transparent overflow-hidden rounded-lg flex items-center justify-center border-[1px]`}
    >
      {svgContent ? (
        <div className='w-full h-full inline-flex items-center justify-center relative'>
          <motion.div
            className='w-full h-full inline-flex items-center justify-center'
            dangerouslySetInnerHTML={{ __html: svgContent }}
          ></motion.div>
          <span className='absolute top-1 right-1 inline-flex items-center justify-center rounded-lg text-sm p-1'>
            {props.size ? null : (
              <span
                className='z-20 bg-[rgb(255,255,255,0.5)] backdrop-blur-lg border-[1px] p-1 rounded-lg'
                onClick={() => setClicked((prev) => !prev)}
              >
                {clicked ? (
                  <RiCloseLine className='text-xl' />
                ) : (
                  <CiCircleMore className='text-xl' />
                )}
              </span>
            )}
            {clicked && (
              <span className='top-0 border-[1px] border-gray-300 w-40 right-0 h-32 flex flex-col gap-2 p-2 rounded-lg z-10 absolute bg-[rgba(255,255,255,0.5)] backdrop-blur-md'>
                <Link
                  to={`/dashboard/image/${props?.documentData?.$id}`}
                  className='w-full hover:bg-white border-[1px] border-transparent hover:border-[1px] hover:border-gray-300 px-2 py-1 rounded-lg'
                >
                  <span>View</span>
                </Link>
                <span className='w-full hover:bg-white border-[1px] border-transparent hover:border-[1px] hover:border-gray-300 px-2 py-1 rounded-lg'>
                  Share
                </span>
                <span className='w-full hover:bg-white border-[1px] border-transparent hover:border-[1px] hover:border-gray-300 px-2 py-1 rounded-lg'>
                  Delete
                </span>
              </span>
            )}
          </span>

          {props.size ? null : (
            <span className='absolute bottom-1 rounded-lg text-sm px-2 py-1 bg-[rgb(255,255,255,0.5)] backdrop-blur-lg'>
              {title}
            </span>
          )}
        </div>
      ) : (
        'SVG'
      )}
    </motion.div>
  );
};

export default SvgCard;
