import VideoCard from './video';
import AudioPlayer from './audio';
import { UserDocumentProps } from '../../interface';
import ApplicationCard from './applications';
import DocumentCard from './documents';
import Image from './image/index';

interface Props {
  data: UserDocumentProps;
  extension: string;
  size?:string
}

const MediaCard = (props: Props) => {
  switch (props?.extension) {
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
    case 'image jfif':
    case 'image gif':
    case 'image svg':
      return (
        <Image
          size={props?.size}
          extension={props.data.extension}
          documentData={props.data}
        />
      );

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
          extension={props.data.extension}
          documentData={props.data}
        />
      );

    default:
      return (
        <DocumentCard extension={props.extension} documentData={props.data} />
      );
  }
};

export default MediaCard;
