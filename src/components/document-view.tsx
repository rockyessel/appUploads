import DocViewer, {
  DocViewerRenderers,
  IDocument,
} from '@cyntler/react-doc-viewer';
import CodeViewer from './code';
import { UserDocumentProps } from '../interface';

interface Props {
  documentData: UserDocumentProps;
}

const d = (documents: IDocument[], extension: string) => {
  switch (extension) {
    case 'pdf':
    case 'txt':
    case 'doc':
    case 'docx':
    case 'xls':
    case 'xlsx':
      return (
        <div className='h-[40rem] overflow-y-auto overflow-hidden'>
          <DocViewer
            className='rounded-lg'
            documents={documents}
            pluginRenderers={DocViewerRenderers}
          />
        </div>
      );


    case 'ttf':
    case 'woff':
    case 'otf':
    case 'ics':
      return (<p>Dont have the right format yet.</p>)

    default:
      return (
        <div className='h-[40rem] overflow-y-auto overflow-hidden'>
          <CodeViewer url={documents[0].uri} />
        </div>
      );
  }
};

const DocumentView = (props: Props) => {
  const docs: IDocument[] = [{ uri: `${props.documentData?.view}` }];

  return d(docs, props.documentData?.extension);
};

export default DocumentView;
