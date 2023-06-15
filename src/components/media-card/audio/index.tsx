import React from 'react';
import { Metadata, UserDocumentProps } from '../../../interface';
import MainAudioCard from './main-card';
import DefaultAudioCard from './default-card';
import { fetchAudioData } from '../../../utils/functions';

interface Props {
  documentData: UserDocumentProps;
  size?: string;
}

const AudioPlayer = (props: Props) => {
  // Define state variable to store the audio metadata
  const [metadata, setMetadata] = React.useState<Metadata | undefined>();

  // Fetch audio data and update the metadata when the 'view' prop changes
  React.useEffect(() => {
    fetchAudioData(`${props?.documentData?.view}`, setMetadata);
  }, [props?.documentData?.view]);

  // Check if the audio data is available
  const isDataAvailable =
    metadata && metadata?.picture && metadata?.picture.data;

  // Extract the image data from the metadata
  const image =
    metadata &&
    metadata?.picture &&
    metadata?.picture.data &&
    `data:${metadata?.picture?.format};base64,${btoa(
      Array.from(metadata?.picture?.data)
        .map((byte) => String.fromCharCode(byte))
        .join('')
    )}`;

  // Extract the title from the metadata
  const title = metadata && metadata.title;

  // Create an object with the title and image data for the audio
  const audioObj = {
    title,
    image,
  };

  // Render the MainAudioCard component if data is available, otherwise render the DefaultAudioCard component
  return isDataAvailable ? (
    <MainAudioCard
      size={props.size}
      documentData={props?.documentData}
      audioData={audioObj}
    />
  ) : (
    <DefaultAudioCard documentData={props?.documentData} />
  );
};

export default AudioPlayer;
