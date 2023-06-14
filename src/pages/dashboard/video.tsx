import { DashboardContentDisplay } from '../../components';

const DashboardVideosFiles = () => {
  return (
    <DashboardContentDisplay
      loaderMessage={'Videos'}
      emptyDocumentMessage={'Video'}
      allowedDocumentTypes={['video']}
    />
  );
};

export default DashboardVideosFiles;
