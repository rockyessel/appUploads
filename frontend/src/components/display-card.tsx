import { motion } from 'framer-motion';
import AudioPlayer from './media-card/audio';
import { UserDocumentProps } from '../interface';
import SvgCard from './media-card/svg';

interface Props {
  extension: string;
  value?: string;
  data?: UserDocumentProps;
}

const DisplayCard = (props: Props) => {
  switch (props.extension) {
    // @desc mimeType extension
    case 'svg':
      return <SvgCard documentData={props.data} />;

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
      return (
        <motion.div className='w-full bg-gray-50 h-[20rem] overflow-hidden rounded-lg flex items-center border-[1px]'>
          <video src={props?.value} />
        </motion.div>
      );

    // @desc mimeType extension
    case 'mp3':
      return <AudioPlayer value={props.value} />;

    // @desc mimeType extension
    case 'text html':
      return (
        <motion.div className='w-full bg-gray-50 h-[20rem] overflow-hidden rounded-lg flex items-center px-10 border-[1px]'>
          <video src={props?.value} />
        </motion.div>
      );

    default:
      return (
        <motion.div className='w-full h-[20rem] overflow-hidden rounded-lg flex items-center border-[1px]'>
          <img
            className='w-full h-full object-cover object-center'
            src={props?.value}
            alt=''
          />
        </motion.div>
      );
  }
};

export default DisplayCard;
