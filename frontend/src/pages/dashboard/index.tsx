import React from 'react';
import UserScreen from './user-screen';
import { useSnapshot } from 'valtio';
import { screenState } from '../../utils/state';
import Layout from '../../components/dashboard/layout';
import { useAppwriteContext } from '../../context/app-write';
import ImageScreen from './image-screen';

const Dashboard = () => {
  const snap = useSnapshot(screenState);
  const { getUser } = useAppwriteContext();
  const [loading, setLoading] = React.useState(false);
  const [user, setUser] = React.useState(false);

  const getUserInfo = async () => {
    setLoading(true);
    const user_ = await getUser();
    setUser(user_);
    setLoading(false);
  };

  console.log('user', user);
  console.log('loading', loading);

  React.useEffect(() => {
    getUserInfo();
  });

  return (
    <Layout>
      {snap.dashboardScreen.user && <UserScreen />}
      {snap.dashboardScreen.image && <ImageScreen />}
    </Layout>
  );
};

export default Dashboard;
