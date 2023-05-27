import React from 'react';
import UserScreen from '../screens/user-screen';
import { useSnapshot } from 'valtio';
import { defaultUser, screenState } from '../../../utils/state';
import Layout from '../../../components/dashboard/layout';
import { useAppwriteContext } from '../../../context/app-write';
import ImageScreen from '../screens/image-screen';
import { useNavigate } from 'react-router-dom';
import MusicScreen from '../screens/music-screen';
import DocumentScreen from '../screens/document-screen';
import ApplicationScreen from '../screens/application-screen';
import GenerativeScreen from '../screens/generative-screen';
import SettingsScreen from '../screens/settings-screen';
import VideoScreen from '../screens/video-screen';
import { filteredData } from '../../../utils/functions';
import { UserDocumentProps, UserProps } from '../../../interface';

const Dashboard = (): JSX.Element => {
  const snap = useSnapshot(screenState);
  const { getUser, getCurrentUserDocuments, setGlobalDocumentData } =
    useAppwriteContext();
  const [loading, setLoading] = React.useState(false);
  // const [getAllUserDocuments, setGetAllUserDocuments] = React.useState<{
  //   total: number;
  //   documents: UserDocumentProps[] | [];
  // }>([]);
  const [user, setUser] = React.useState<UserProps>(defaultUser);

  const navigate = useNavigate();

  React.useEffect(() => {
    if (!user) navigate('/');
  }, [navigate, user]);

  const getLoginUserInfo = React.useCallback(async () => {
    try {
      setLoading(true);
      const user_ = await getUser();
      setUser(user_);
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  }, [getUser]);

  React.useEffect(() => {
    getLoginUserInfo();
  }, []);

  React.useEffect(() => {
    const getAllUserDocuments = async () => {
      if (user) {
        const allCurrentUserDocuments = await getCurrentUserDocuments(
          user?.$id
        );
        setGlobalDocumentData(
          filteredData(allCurrentUserDocuments?.documents, 'image')
        );
      }
    };
    getAllUserDocuments();
  }, [user]);

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
