import React from 'react';
import PlyrVideoCard from './video';
import { UserDocumentProps } from '../../interface';
import DocumentView from '../document-view';
import CodeViewer from '../code';
import Image from '../media-card/image';

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
        <Image
          size='w-full lg:w-[40rem]'
          extension={props.documentData.extension}
          documentData={props.documentData}
        />
      );

    default:
      return <p>Hello World</p>;
  }
};

export default MediaViewerCard;
