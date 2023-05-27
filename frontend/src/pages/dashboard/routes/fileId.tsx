import React from 'react';
import Layout from '../../../components/dashboard/layout';
import { screenState } from '../../../utils/state';

interface Props {}

const FileId = () => {
  React.useEffect(() => {
    screenState.dashboardScreen.settings = false;
    screenState.dashboardScreen.music = false;
    screenState.dashboardScreen.application = false;
    screenState.dashboardScreen.document = false;
    screenState.dashboardScreen.generative = false;
    screenState.dashboardScreen.image = false;
    screenState.dashboardScreen.video = false;
  }, []);

  return <Layout>hello world</Layout>;
};

export default FileId;
