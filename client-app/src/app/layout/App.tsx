import React, { useEffect } from 'react';
import './styles.css';
import { Container } from 'semantic-ui-react';
import NavBar from './NavBar';
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard';
import LoadingComponent from './LoadingComponent';
import { useStore } from '../stores/store';
import { observer } from 'mobx-react-lite';

const App: React.FC = () => {
  const {
    activityStore: { loadingInitial, loadActivities },
  } = useStore();

  useEffect(() => {
    loadActivities();
  }, [loadActivities]);
  if (loadingInitial) return <LoadingComponent content="Loading App" />;

  return (
    <>
      <NavBar />
      <Container style={{ marginTop: '7em' }}>
        <ActivityDashboard />
      </Container>
    </>
  );
};

export default observer(App);
