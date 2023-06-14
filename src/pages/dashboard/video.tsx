import { DashboardContentDisplay } from '../../components';

const DashboardVideosFiles = () => {
  return (
    <DashboardContentDisplay
      loaderMessage={'Getting your files ready.'}
      emptyDocumentMessage={'Video'}
      allowedDocumentTypes={['video']}
    />
  );
};

export default DashboardVideosFiles;
