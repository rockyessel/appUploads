import { UserDocumentProps } from '../../interface';
import MediaCard from '../media-card';

interface Props {
  documentsData: UserDocumentProps[];
  currentSlider: number;
}

const DisplayUploadedFiles = (props: Props) => {
  const mediaCards = props.documentsData
    .filter((document) => {
      const { mimeType } = document;
      return (
        mimeType.startsWith('image') ||
        mimeType.startsWith('audio') ||
        mimeType.startsWith('video') ||
        mimeType.startsWith('application') ||
        mimeType.startsWith('text')
      );
    })
    .map((document, index) => (
      <div key={index}>
        {/* Display the media card if it matches the currentSlider index */}
        {document.$id === props.documentsData[props.currentSlider].$id && (
          <div>
            <MediaCard
              size='w-full md:w-[40rem] h-40 md:h-[20rem]'
              data={document}
              key={index}
              extension={`${document.mimeType?.split('/').shift()} ${
                document.extension
              }`}
            />
          </div>
        )}
      </div>
    ));

  return <div>{mediaCards}</div>;
};

export default DisplayUploadedFiles;
