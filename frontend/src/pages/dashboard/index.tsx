import React from 'react';
import UserScreen from './user-screen';
import { useSnapshot } from 'valtio';
import { screenState } from '../../utils/state';
import Layout from '../../components/dashboard/layout';
import { useAppwriteContext } from '../../context/app-write';
import ImageScreen from './image-screen';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const snap = useSnapshot(screenState);
  const { getUser, getAllFiles } = useAppwriteContext();
  const [loading, setLoading] = React.useState(false);
  const [user, setUser] = React.useState<unknown>({});

  const navigate = useNavigate();
  const getUserInfo = React.useCallback(async () => {
    setLoading(true);
    const user_ = await getUser();
    const data = await getAllFiles(
      `${import.meta.env.VITE_APPWRITE_BUCKET_ID}`
    );
    console.log(data);

    setUser(user_);
    setLoading(false);
  }, [getAllFiles, getUser]);

  React.useEffect(() => {
    getUserInfo();
  }, [getUserInfo]);

  React.useEffect(() => {
    if (!user) navigate('/');
  }, [navigate, user]);

  if (loading) return;
  return (
    <Layout>
      {snap.dashboardScreen.user && <UserScreen />}
      {snap.dashboardScreen.image && <ImageScreen />}
    </Layout>
  );
};

export default Dashboard;
