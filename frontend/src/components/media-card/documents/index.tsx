// import React from 'react';
import { UserDocumentProps } from '../../../interface';
import MicrosoftCard from './ms';

interface Props {
  documentData: UserDocumentProps;
  extension: string;
}
const DocumentCard = (props: Props) => {
  switch (props.extension) {
    case 'application dotx':
    case 'application xlts':
    case 'application potx':
    case 'application doc':
    case 'application xls':
    case 'application ppt':
    case 'application dot':
    case 'application xlt':
    case 'application pot':
    case 'application docx':
    case 'application xlsx':
    case 'application pptx':
      return <MicrosoftCard documentData={props.documentData} />;

    default:
      return <p>Helo</p>;
  }
};

export default DocumentCard;
