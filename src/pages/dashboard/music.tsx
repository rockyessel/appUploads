import { DashboardContentDisplay } from '../../components';

const DashboardMusicFiles = () => {
  return (
    <DashboardContentDisplay
      loaderMessage={'Getting your files ready.'}
      emptyDocumentMessage={'Music'}
      allowedDocumentTypes={['audio']}
    />
  );
};

export default DashboardMusicFiles;
