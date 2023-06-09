// import React from 'react';
import { UserDocumentProps } from '../../../interface';
import ImageCard from '../../media-card/image/main';
import SvgCard from '../../media-card/image/svg';

interface Props {
  extension: string;
  documentData: UserDocumentProps;
}

const Image = (props: Props) => {
  if (props.extension === 'svg') {
    return <SvgCard documentData={props.documentData} />;
  } else {
    return <ImageCard  documentData={props.documentData} />;
  }
};

export default Image;
