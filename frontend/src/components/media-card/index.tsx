// import React from 'react'
// import { motion } from 'framer-motion';
import VideoCard from './video';
import AudioPlayer from './audio';
import ImageCard from './image';
import { UserDocumentProps } from '../../interface';
import SvgCard from './svg';
import ApplicationCard from './applications';
import DefaultCard from './applications/default-card';
import DocumentCard from './documents';

interface Props {
  data: UserDocumentProps;
  extension: string;
  value: string;
  svgElementContent: string | TrustedHTML;
}

const MediaCard = (props: Props) => {
  // console.log('props', props);

  switch (props?.extension) {
    // @desc mimeType extension
    case 'image svg':
      return <SvgCard documentData={props?.data} />;

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
      return <VideoCard documentData={props.data} />;

    // // @desc mimeType extension
    case 'audio mp3':
    case 'audio mpeg':
    case 'audio wma':
      return <AudioPlayer documentData={props.data} />;

    // @desc mimeType extension
    case 'image png':
    case 'image webp':
    case 'image jpg':
    case 'image jpeg':
      return <ImageCard documentData={props.data} />;

    // @desc mimeType extension
    case 'application exe':
    case 'application msi':
    case 'application app':
    case 'application deb':
    case 'application rpm':
    case 'application apk':
    case 'application ipa':
    case 'application dmg':
      return (
        <ApplicationCard
          extension={props.extension}
          documentData={props.data}
        />
      );

    // @desc mimeType extension
    case 'text txt':
    case 'text csv':
    case 'text html':
    case 'text cs':
    case 'text cpp':
    case 'text h':
    case 'text hpp':
    case 'text rs':
    case 'text java':
    case 'text ts':
    case 'application js':
    case 'application pdf':
    case 'application docx':
    case 'application xlsx':
    case 'application pptx':
    case 'application zip':
    case 'application ttf':
    case 'application otf':
    case 'font woff2':
    case 'font woff':
    case 'application eot':
    case 'application dfont':
    case 'application pfa':
    case 'application pfb':
    case 'application dotx':
    case 'application xlts':
    case 'application potx':
    case 'application doc':
    case 'application xls':
    case 'application ppt':
    case 'application dot':
    case 'application xlt':
    case 'application pot':
      return (
        <DocumentCard extension={props.extension} documentData={props.data} />
      );

    /// // @desc mimeType extension
    // case 'text html':
    //   return (
    //     <motion.div className='w-full bg-transparent h-32 overflow-hidden rounded-lg flex items-center px-10 border-[1px]'>
    //       <video src={props?.value} />
    //     </motion.div>
    //   );

    default:
      return <DefaultCard documentData={props.data} />;
  }
};

export default MediaCard;
