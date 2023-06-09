// import React from 'react'
import { UserDocumentProps } from '../../../interface';
import AndroidCard from './android-card';
import AppleCard from './apple-card';
// import DefaultCard from './default-card';
import DesktopCard from './desktop-card';
import LinuxCard from './linux-card';
// import { AiOutlineAppstoreAdd } from 'react-icons/ai';

interface Props {
  documentData: UserDocumentProps;
  extension: string;
}

const ApplicationCard = (props: Props) => {
  switch (props.extension) {
    // @desc Apple Applications (macOS and iOS)
    case 'app':
    case 'ipa':
    case 'dmg':
      return <AppleCard documentData={props.documentData} />;

    // @desc Mobile Apps (Android)
    case 'apk':
    case 'xapk':
      return <AndroidCard documentData={props.documentData} />;

    // @desc Linux Applications
    case 'deb':
    case 'rpm':
      return <LinuxCard documentData={props.documentData} />;

    // @desc Desktop Applications
    case 'exe':
    case 'msi':
      return <DesktopCard documentData={props.documentData} />;

    // @desc For any other extension
    default:
      return <p></p>;
  }
};

export default ApplicationCard;
