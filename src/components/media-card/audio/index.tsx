import React from 'react';
import { Metadata, UserDocumentProps } from '../../../interface';
import MainAudioCard from './main-card';
import DefaultAudioCard from './default-card';
import { fetchAudioData } from '../../../utils/functions';

interface Props {
  documentData: UserDocumentProps;
}

const AudioPlayer = (props: Props) => {
  const [metadata, setMetadata] = React.useState<Metadata | undefined>();

  React.useEffect(() => {
    fetchAudioData(`${props?.documentData?.view}`, setMetadata);
  }, [props?.documentData?.view]);

  const isDataAvailable =
    metadata && metadata?.picture && metadata?.picture.data;
  const image =
    metadata &&
    metadata?.picture &&
    metadata?.picture.data &&
    `data:${metadata?.picture?.format};base64,${btoa(
      Array.from(metadata?.picture?.data)
        .map((byte) => String.fromCharCode(byte))
        .join('')
    )}`;

  const title = metadata && metadata.title;

  const audioObj = {
    title,
    image,
  };

  return isDataAvailable ? (
    <MainAudioCard documentData={props?.documentData} audioData={audioObj} />
  ) : (
    <DefaultAudioCard documentData={props?.documentData} />
  );
};

export default AudioPlayer;
