import { UserDocumentProps } from '../../interface';
import { format } from 'date-fns';

interface Props {
  documentData: UserDocumentProps;
}

const FileDescription = (props: Props) => {
  const formattedCreatedAt = props.documentData.createdAt
    ? format(new Date(props.documentData.createdAt), 'do MMMM Y')
    : '';

  return (
    <div className='w-full flex flex-wrap justify-start gap-10 rounded-lg bg-[rgba(255,255,255,0.4)] backdrop-blur-md p-3'>
      <p className='flex flex-col'>
        <span className='font-bold'>Filename</span>
        <span className=''>{props.documentData?.filename}</span>
      </p>
      <p className='flex flex-col'>
        <span className='font-bold'>File ID</span>
        <span className=''>{props.documentData?.$id}</span>
      </p>
      <p className='flex flex-col'>
        <span className='font-bold'>File Extension</span>
        <span>{props.documentData?.extension}</span>
      </p>
      <p className='flex flex-col'>
        <span className='font-bold'>File Size</span>
        <span>{props.documentData?.size}</span>
      </p>
      <p className='flex flex-col'>
        <span className='font-bold'>Uploaded on</span>
        <span>{formattedCreatedAt}</span>
      </p>
      <p className='flex flex-col'>
        <span className='font-bold'>Mimetype on</span>
        <span>{props.documentData?.mimeType}</span>
      </p>
      <p className='flex flex-col'>
        <span className='font-bold'>Access Code</span>
        <span>{props.documentData?.accessCode}</span>
      </p>
    </div>
  );
};

export default FileDescription;
