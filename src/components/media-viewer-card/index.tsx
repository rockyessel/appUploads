import React from 'react';
import PlyrVideoCard from './video';
import { UserDocumentProps } from '../../interface';
import DocumentView from './document-view';
import Image from '../media-card/image';
import AudioPlayer from './audio/AudioPlayer';

interface Props {
  fileCategory?: string; // The category of the file (e.g., video, document, image, music)
  documentData: UserDocumentProps; // Data of the user document
}

const MediaViewerCard = (props: Props): React.JSX.Element => {
  switch (props.fileCategory) {
    case 'video':
      return <PlyrVideoCard url={props.documentData.view} />; // Render the PlyrVideoCard component for videos

    case 'document':
      return <DocumentView documentData={props.documentData} />; // Render the DocumentView component for documents

    case 'image':
      return (
        <div className='flex items-center justify-center w-full bg-[rgba(0,0,0,0.5)] rounded-lg'>
          <Image
            size='w-full lg:w-[40rem]'
            extension={props.documentData.extension}
            documentData={props.documentData}
          />
        </div>
      ); // Render the Image component for images

    case 'music':
      return <AudioPlayer documentData={props.documentData} />; // Render the AudioPlayer component for music files

    default:
      return <p>Hello World</p>; // Render a default message if the file category is not recognized
  }
};

export default MediaViewerCard;
