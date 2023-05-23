import React from 'react';
import UserScreen from './user-screen';
import { useSnapshot } from 'valtio';
import { screenState } from '../../utils/state';
import Layout from '../../components/dashboard/layout';
import { useAppwriteContext } from '../../context/app-write';
import ImageScreen from './image-screen';
import { useNavigate } from 'react-router-dom';
import MusicScreen from './music-screen';
import DocumentScreen from './document-screen';
import ApplicationScreen from './application-screen';
import GenerativeScreen from './generative-screen';
import SettingsScreen from './settings-screen';
import VideoScreen from './video-screen';
import { filteredData, getFileCategory } from '../../utils/functions';

const Dashboard = (): JSX.Element => {
  const snap = useSnapshot(screenState);
  const { getUser, getDocumentFrom_db } = useAppwriteContext();
  const [loading, setLoading] = React.useState(false);
  const [user, setUser] = React.useState<unknown>({});

  const navigate = useNavigate();
  const getUserInfo = React.useCallback(async () => {
    setLoading(true);
    const user_ = await getUser();

    console.log(
      'mimeType',
      await getFileCategory(
        'https://cloud.appwrite.io/v1/storage/buckets/1212/files/6469f6107412209a820e/view?project=6467e00455d86a312998'
      )
    );

    const getAllDocuments = await getDocumentFrom_db();
    console.log('getAllDocuments', getAllDocuments);
    filteredData(getAllDocuments?.documents, 'audio');
    setUser(user_);
    setLoading(false);
  }, [getDocumentFrom_db, getUser]);

  React.useEffect(() => {
    getUserInfo();
  }, [getUserInfo]);

  React.useEffect(() => {
    if (!user) navigate('/');
  }, [navigate, user]);

  if (loading) return <p>Loading</p>;
  return (
    <Layout>
      {snap.dashboardScreen.user && <UserScreen />}
      {snap.dashboardScreen.image && <ImageScreen />}
      {snap.dashboardScreen.music && <MusicScreen />}
      {snap.dashboardScreen.document && <DocumentScreen />}
      {snap.dashboardScreen.application && <ApplicationScreen />}
      {snap.dashboardScreen.generative && <GenerativeScreen />}
      {snap.dashboardScreen.settings && <SettingsScreen />}
      {snap.dashboardScreen.video && <VideoScreen />}
    </Layout>
  );
};

export default Dashboard;
