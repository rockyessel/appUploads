import React from 'react';
import MediaCard from '../media-card';
import { UserDocumentProps } from '../../interface';

interface Props {
  date: string;
  files: UserDocumentProps[];
}

const RecentBodyComponent = (props: Props) => {
  const [activeGroup, setActiveGroup] = React.useState('');

  const toggleGroup = (date: string) => {
    setActiveGroup((prevGroup) => (prevGroup === date ? '' : date));
  };

  return (
    <div className='flex flex-col gap-2'>
      <h3 onClick={() => toggleGroup(props.date)}>
        {props.date} {activeGroup === props.date ? '-' : '+'}
      </h3>
      <div className='flex flex-wrap gap-2'>
        {activeGroup === props.date && (
          <ul className='flex flex-wrap gap-2 items-center'>
            {props.files.map((file, index_) => (
              <MediaCard
                key={index_}
                data={file}
                extension={`${file?.mimeType?.split('/').shift()} ${
                  file?.extension
                }`}
              />
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default RecentBodyComponent;
