// import React from 'react'
import { UserDocumentProps } from '../../../interface';
import AndroidCard from './android-card';
import AppleCard from './apple-card';
import DefaultCard from './default-card';
import DesktopCard from './desktop-card';
import LinuxCard from './linux-card';

interface Props {
  documentData: UserDocumentProps;
  extension: string;
}

const ApplicationCard = (props: Props) => {
  switch (props.extension) {
    // @desc Apple Applications (macOS and iOS)
    case 'application app':
    case 'application ipa':
    case 'application dmg':
      return <AppleCard documentData={props.documentData} />;

    // @desc Mobile Apps (Android)
    case 'application apk':
    case 'application xapk':
      return <AndroidCard documentData={props.documentData} />;

    // @desc Linux Applications
    case 'application deb':
    case 'application rpm':
      return <LinuxCard documentData={props.documentData} />;

    // @desc Desktop Applications
    case 'application exe':
    case 'application msi':
      return <DesktopCard documentData={props.documentData} />;

    // @desc For any other application extension
    default:
      return <DefaultCard documentData={props.documentData} />;
  }
};

export default ApplicationCard;
