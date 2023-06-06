import React from 'react';
import PlyrVideoCard from './video';
import { UserDocumentProps } from '../../interface';
import DocumentView from '../document-view';
import CodeViewer from '../code';

interface Props {
  fileCategory?: string;
  documentData: UserDocumentProps;
}

const MediaViewerCard = (props: Props): React.JSX.Element => {
  switch (props.fileCategory) {
    case 'video':
      return <PlyrVideoCard url={props.documentData.view} />;

    case 'document':
      return <DocumentView url={props.documentData.view} />;
    case 'image':
      return (
        <img
          src={props.documentData.view}
          title={props.documentData.filename}
          className='rounded-lg w-[30rem]'
        />
      );
    case 'code':
      return <CodeViewer url={props.documentData.view} />;

    default:
      return <p>Hello World</p>;
  }
};

export default MediaViewerCard;
