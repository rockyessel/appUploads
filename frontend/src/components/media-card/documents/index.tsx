// import React from 'react';
import { UserDocumentProps } from '../../../interface';
import CodeCard from './code';
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
    case 'text js':
      return <CodeCard documentData={props.documentData} />;

    default:
      return <p>Helo</p>;
  }
};

export default DocumentCard;
