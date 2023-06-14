import { DashboardContentDisplay } from '../../components';

const DashboardImageFiles = () => {
  return (
    <DashboardContentDisplay
      loaderMessage={'Getting your files ready.'}
      emptyDocumentMessage={'Image'}
      allowedDocumentTypes={['image']}
    />
  );
};

export default DashboardImageFiles;
