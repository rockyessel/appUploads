// import React from 'react'
import DocViewer, { DocViewerRenderers } from '@cyntler/react-doc-viewer';

interface Props {
  url: string;
}

const DocumentView = (props: Props) => {
  const docs = [{ uri: `${props.url}` }];

  return (
    <div className='h-[40rem] overflow-y-auto  overflow-hidden'>
      <DocViewer
        className='rounded-lg'
        documents={docs}
        pluginRenderers={DocViewerRenderers}
      />
    </div>
  );
};

export default DocumentView;
