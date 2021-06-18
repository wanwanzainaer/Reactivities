import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './styles.css';
import { Container, List } from 'semantic-ui-react';
import { Activity } from '../models/activity';
import NavBar from './NavBar';
import ActivityDashboard from '../../features/dashboard/ActivityDashboard';

const App: React.FC = () => {
  const [activities, setActivities] = useState<Activity[]>([]);

  useEffect(() => {
    const activitiesRequest = async () => {
      const { data } = await axios.get<Activity[]>(
        'http://localhost:5000/api/activities'
      );
      setActivities(data);
    };
    activitiesRequest();
  }, [activities.length]);
  return (
    <>
      <NavBar />
      <Container style={{ marginTop: '7em' }}>
        <ActivityDashboard activities={activities} />
      </Container>
    </>
  );
};

export default App;
