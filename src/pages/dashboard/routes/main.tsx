import { useSnapshot } from 'valtio';
import { screenState } from '../../../utils/state';
import Layout from '../../../components/dashboard/layout';
import DefaultScreen from '../screens/default-screen';
import ShareScreen from '../screens/share-screen';

const Dashboard = (): JSX.Element => {
  const snap = useSnapshot(screenState);
  return (
    <Layout>
      {snap.dashboardScreen.default && <DefaultScreen />}
      {snap.dashboardScreen.share && <ShareScreen />}
    </Layout>
  );
};

export default Dashboard;
