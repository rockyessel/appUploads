// import React from 'react';
import { UserDocumentProps } from '../../../interface';
import SvgCard from './svg';
import ImageCard from './main';

interface Props {
  extension: string;
  documentData: UserDocumentProps;
  size?: string;
}

const Image = (props: Props) => {
  if (props.extension === 'svg') {
    return <SvgCard size={props?.size} documentData={props.documentData} />;
  } else {
    return <ImageCard size={props?.size} documentData={props.documentData} />;
  }
};

export default Image;
