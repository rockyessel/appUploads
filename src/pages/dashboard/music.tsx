import { DashboardContentDisplay } from '../../components';

const DashboardMusicFiles = () => {
  return (
    <DashboardContentDisplay
      loaderMessage={'Getting your files ready.'}
      emptyDocumentMessage={'Upload to see your audio files here'}
      allowedDocumentTypes={['audio']}
    />
  );
};

export default DashboardMusicFiles;
