import { DashboardContentDisplay } from '../../components';

const DashboardImageFiles = () => {
  return (
    <DashboardContentDisplay
      loaderMessage={'Getting your files ready.'}
      emptyDocumentMessage={'Upload to see your images here'}
      allowedDocumentTypes={['image']}
    />
  );
};

export default DashboardImageFiles;
