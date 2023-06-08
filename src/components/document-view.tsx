// import React from 'react'
import DocViewer, { DocViewerRenderers } from '@cyntler/react-doc-viewer';
import CodeViewer from './code';
import { UserDocumentProps } from '../interface';

interface Props {
  documentData: UserDocumentProps;
}

const d = (url:[{url:string}],extension:string) => {
  switch (extension) {
    case 'pdf':
    case 'txt':
    case 'doc':
    case 'docx':
    case 'xls':
    case 'xlsx':
      return (
        <div className='h-[40rem] overflow-y-auto  overflow-hidden'>
          <DocViewer
            className='rounded-lg'
            documents={url}
            pluginRenderers={DocViewerRenderers}
          />
        </div>
      );

    default:
      return (
        <div className='h-[40rem] overflow-y-auto  overflow-hidden'>
          <CodeViewer url={url[0].url} />
        </div>
      );
  }
};

const DocumentView = (props: Props) => {
  const docs = [{ uri: `${props.documentData?.view}` }];

  return d(docs,props.documentData?.extension);
};

export default DocumentView;
