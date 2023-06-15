import { DashboardContentDisplay } from '../../components';

const DashboardVideosFiles = () => {
  return (
    <DashboardContentDisplay
      loaderMessage={'Getting your files ready.'}
      emptyDocumentMessage={'Upload to see your videos here'}
      allowedDocumentTypes={['video']}
    />
  );
};

export default DashboardVideosFiles;
