import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './styles.css';
import { Container } from 'semantic-ui-react';
import { Activity } from '../models/activity';
import NavBar from './NavBar';
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard';
import { v4 as uuid } from 'uuid';

const App: React.FC = () => {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [selectedActivity, setSelectedActivity] =
    useState<Activity | undefined>(undefined);
  const [editMode, setEditMode] = useState(false);
  useEffect(() => {
    const activitiesRequest = async () => {
      const { data } = await axios.get<Activity[]>(
        'http://localhost:5000/api/activities'
      );
      setActivities(data);
    };
    activitiesRequest();
  }, [activities.length]);

  const handleSelectedActivity = (id: string) => {
    setSelectedActivity(activities.find((x) => x.id === id));
  };
  const handleCancelSelectActivity = () => {
    setSelectedActivity(undefined);
  };

  const handleFormClose = () => {
    setEditMode(false);
  };

  const handleFormOpen = (id?: string) => {
    id ? handleSelectedActivity(id) : handleCancelSelectActivity();
    setEditMode(true);
  };

  const handleCreateOrEditActivity = (activity: Activity) => {
    activity.id
      ? setActivities((state) => [
          ...state.filter((x) => x.id !== activity.id),
          activity,
        ])
      : setActivities((state) => [...state, { ...activity, id: uuid() }]);
    setEditMode(false);
    setSelectedActivity(activity);
  };

  const handleDeleteActivity = (id: string) => {
    setActivities((state) => [...state.filter((x) => x.id !== id)]);
  };
  return (
    <>
      <NavBar openForm={handleFormOpen} />
      <Container style={{ marginTop: '7em' }}>
        <ActivityDashboard
          activities={activities}
          selectedActivity={selectedActivity}
          cancelSelectActivity={handleCancelSelectActivity}
          selectActivity={handleSelectedActivity}
          editMode={editMode}
          openForm={handleFormOpen}
          closeForm={handleFormClose}
          createOrEdit={handleCreateOrEditActivity}
          deleteActivity={handleDeleteActivity}
        />
      </Container>
    </>
  );
};

export default App;
