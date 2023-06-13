// import React from 'react'
import { UserDocumentProps } from '../interface';
import MediaCard from './media-card';

interface Props {
  documentsData: UserDocumentProps[];
  currentSlider: number;
}

const DisplayUploadedFiles = (props: Props) => {
  return (
    <div>
      {/* Displaying image media cards */}
      {props.documentsData.map(
        (document, index) =>
          document.mimeType.startsWith('image') && (
            <div key={index}>
              {/* Display the media card if it matches the currentSlider index */}
              {document.$id ===
                props.documentsData[props.currentSlider].$id && (
                <div>
                  <MediaCard
                    size='w-[35rem] h-[20rem]'
                    data={document}
                    key={index}
                    extension={`image ${document.extension}`}
                  />
                </div>
              )}
            </div>
          )
      )}

      {/* Displaying audio media cards */}
      {props.documentsData.map(
        (document, index) =>
          document.mimeType.startsWith('audio') && (
            <div key={index}>
              {/* Display the media card if it matches the currentSlider index */}
              {document.$id ===
                props.documentsData[props.currentSlider].$id && (
                <div>
                  <MediaCard
                    data={document}
                    key={index}
                    extension={`audio ${document.extension}`}
                  />
                </div>
              )}
            </div>
          )
      )}

      {/* Displaying video media cards */}
      {props.documentsData.map(
        (document, index) =>
          document.mimeType.startsWith('video') && (
            <div key={index}>
              {/* Display the media card if it matches the currentSlider index */}
              {document.$id ===
                props.documentsData[props.currentSlider].$id && (
                <div>
                  <MediaCard
                    data={document}
                    key={index}
                    extension={`video ${document.extension}`}
                  />
                </div>
              )}
            </div>
          )
      )}

      {/* Displaying application media cards */}
      {props.documentsData.map(
        (document, index) =>
          document.mimeType.startsWith('application') && (
            <div key={index}>
              {/* Display the media card if it matches the currentSlider index */}
              {document.$id ===
                props.documentsData[props.currentSlider].$id && (
                <div>
                  <MediaCard
                    data={document}
                    key={index}
                    extension={`application ${document.extension}`}
                  />
                </div>
              )}
            </div>
          )
      )}
    </div>
  );
};

export default DisplayUploadedFiles;
