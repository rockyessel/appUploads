import { UserDocumentProps } from '../../../interface';
import DefaultCard from '../default-card';

interface Props {
  documentData: UserDocumentProps;
  extension: string;
}

const ApplicationCard = (props: Props) => {
  switch (props.extension) {
    // @desc Both iOS, Android and Windows Apps
    case 'app':
    case 'ipa':
    case 'dmg':
    case 'apk':
    case 'xapk':
    case 'deb':
    case 'rpm':
    case 'exe':
    case 'msi':
      return (
        <DefaultCard
          documentData={props.documentData}
          documentType={'application'}
        />
      );

    default:
      return <p>cdcdc</p>;
  }
};

export default ApplicationCard;
