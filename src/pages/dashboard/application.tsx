import { DashboardContentDisplay } from '../../components';

const DashboardApplicationFiles = () => {
  const allowedTypes = [
    // Filter and store the user's application document data based on selected MIME types
    'application/vnd.debian.binary-package',
    'application/x-apple-diskimage',
    'application/octet-stream',
    'application/x-msdownload',
    'application/x-rpm',
  ];

  return (
    <DashboardContentDisplay
      loaderMessage={'Applications'}
      emptyDocumentMessage={'Application'}
      allowedDocumentTypes={allowedTypes}
    />
  );
};

export default DashboardApplicationFiles;
