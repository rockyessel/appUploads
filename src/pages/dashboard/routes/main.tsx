import { useSnapshot } from 'valtio'; 
import { screenState } from '../../../utils/state';
import Layout from '../../../components/dashboard/layout';
import DefaultScreen from '../screens/default-screen';
import ShareScreen from '../screens/share-screen';

const Dashboard = (): JSX.Element => {
  const snap = useSnapshot(screenState); // Creating a snapshot of the screenState object using the useSnapshot hook from Valtio
  return (
    <Layout>
      {/* Conditionally render the DefaultScreen or ShareScreen based on the value of snap.dashboardScreen */}
      {snap.dashboardScreen.default && <DefaultScreen />} {/* Render the DefaultScreen component if snap.dashboardScreen.default is truthy */}
      {snap.dashboardScreen.share && <ShareScreen />} {/* Render the ShareScreen component if snap.dashboardScreen.share is truthy */}
    </Layout>
  );
};

export default Dashboard;
