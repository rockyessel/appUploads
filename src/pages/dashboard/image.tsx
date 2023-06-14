import { DashboardContentDisplay } from '../../components';

const DashboardImageFiles = () => {
  return (
    <DashboardContentDisplay
      loaderMessage={'Images'}
      emptyDocumentMessage={'Image'}
      allowedDocumentTypes={['image']}
    />
  );
};

export default DashboardImageFiles;
