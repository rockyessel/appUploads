import React from 'react';
import PlyrVideoCard from './video';
import { UserDocumentProps } from '../../interface';
import DocumentView from '../document-view';
import Image from '../media-card/image';
import AudioPlayer from './audio/AudioPlayer';

interface Props {
  fileCategory?: string;
  documentData: UserDocumentProps;
}

const MediaViewerCard = (props: Props): React.JSX.Element => {
  switch (props.fileCategory) {
    case 'video':
      return <PlyrVideoCard url={props.documentData.view} />;

    case 'document':
      return <DocumentView documentData={props.documentData} />;

    case 'image':
      return (
        <div className='flex items-center justify-center w-full bg-[rgba(0,0,0,0.5)] rounded-lg'>
          <Image
            size='w-full lg:w-[40rem]'
            extension={props.documentData.extension}
            documentData={props.documentData}
          />
        </div>
      );

    // // @desc mimeType extension
    case 'music':
      return <AudioPlayer documentData={props.documentData} />;

    default:
      return <p>Hello World</p>;
  }
};

export default MediaViewerCard;
