import React from 'react';
import UserScreen from './user-screen';
import { useSnapshot } from 'valtio';
import { screenState } from '../../utils/state';
import Layout from '../../components/dashboard/layout';
import { useAppwriteContext } from '../../context/app-write';
import ImageScreen from './image-screen';
import { useNavigate } from 'react-router-dom';

const Dashboard = ():JSX.Element => {
  const snap = useSnapshot(screenState);
  const { getUser, getDocumentFrom_db } = useAppwriteContext();
  const [loading, setLoading] = React.useState(false);
  const [user, setUser] = React.useState<unknown>({});

  const navigate = useNavigate();
  const getUserInfo = React.useCallback(async () => {
    setLoading(true);
    const user_ = await getUser();


    const getAllDocuments = await getDocumentFrom_db()
    console.log('getAllDocuments', getAllDocuments);
    
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
    </Layout>
  );
};

export default Dashboard;
