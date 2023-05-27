// import React from 'react'
import { motion } from 'framer-motion';
import VideoCard from './video';
import AudioPlayer from './audio';
import ImageCard from './image';
import { UserDocumentProps } from '../../interface';
import SvgCard from './svg';

interface Props {
  data: UserDocumentProps;
  extension: string;
  value: string | TrustedHTML;
}

const MediaCard = (props: Props) => {
  console.log('props', props);

  switch (props?.extension) {
    // @desc mimeType extension
    case 'image svg':
      return <SvgCard extension={props?.extension} />;

    // @desc mimeType extension
    case 'video mp4':
    case 'video swf':
    case 'video mkv':
    case 'video flv':
    case 'video vob':
    case 'video avi':
    case 'video ogg':
    case 'video mpeg':
    case 'video rm':
    case 'video 3gp':
    case 'video m4v':
    case 'video 3g2':
    case 'video mov':
    case 'video mpg':
    case 'video asf':
    case 'video wmv':
    case 'video webm':
      return <VideoCard />;

    // @desc mimeType extension
    case 'audio mp3':
      return <AudioPlayer value={props.value} />;

    // @desc mimeType extension
    case 'text html':
      return (
        <motion.div className='w-full bg-gray-50 h-[20rem] overflow-hidden rounded-lg flex items-center px-10 border-[1px]'>
          <video src={props?.value} />
        </motion.div>
      );

    default:
      return <ImageCard value={props?.data?.view} />;
  }
};

export default MediaCard;
