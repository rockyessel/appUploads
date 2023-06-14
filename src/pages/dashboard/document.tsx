import { DashboardContentDisplay } from '../../components';

const DashboardDocumentFiles = () => {
  const selectedMimetype = [
    // Array of selected MIME types
    'text',
    'text/plain',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'application/vnd.ms-excel',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document ',
    'application/vnd.ms-powerpoint',
    'application/vnd.openxmlformats-officedocument.presentationml.presentation',
    'application/pdf',
    'application/x-zip-compressed',
    'font',
    'application/font-sfnt',
    'application/vnd.ms-fontobject',
    'font/svg',
    'application/x-font-type1',
    'application/postscript',
  ];

  return (
    <DashboardContentDisplay
      loaderMessage={'Getting your files ready.'}
      emptyDocumentMessage={'Document'}
      allowedDocumentTypes={selectedMimetype}
    />
  );
};

export default DashboardDocumentFiles;
