import { DashboardContentDisplay } from '../../components';

const DashboardMusicFiles = () => {
  return (
    <DashboardContentDisplay
      loaderMessage={'Music'}
      emptyDocumentMessage={'Music'}
      allowedDocumentTypes={['audio']}
    />
  );
};

export default DashboardMusicFiles;
