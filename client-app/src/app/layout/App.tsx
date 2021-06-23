import React, { useState, useEffect } from 'react';
import './styles.css';
import { Container } from 'semantic-ui-react';
import { Activity } from '../models/activity';
import NavBar from './NavBar';
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard';
import { v4 as uuid } from 'uuid';
import agent from '../api/agent';
import LoadingComponent from './LoadingComponent';

const App: React.FC = () => {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [selectedActivity, setSelectedActivity] =
    useState<Activity | undefined>(undefined);
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const activitiesRequest = async () => {
      const response = await agent.Activities.list();
      const activities = response.map((activity) => {
        activity.date = activity.date.split('T')[0];
        return activity;
      });
      setLoading(false);
      setActivities(activities);
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

  const handleCreateOrEditActivity = async (activity: Activity) => {
    setSubmitting(true);
    if (activity.id) {
      await agent.Activities.update(activity);
      setActivities((state) => [
        ...state.filter((x) => x.id !== activity.id),
        activity,
      ]);
    } else {
      activity.id = uuid();
      await agent.Activities.create(activity);
      setActivities((state) => [...state, { ...activity, id: uuid() }]);
    }
    setSelectedActivity(activity);
    setEditMode(false);
    setSubmitting(false);
  };

  const handleDeleteActivity = async (id: string) => {
    setSubmitting(true);
    await agent.Activities.delete(id);
    setSubmitting(false);
    setActivities((state) => [...state.filter((x) => x.id !== id)]);
  };

  if (loading) return <LoadingComponent content="Loading App" />;

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
          submitting={submitting}
        />
      </Container>
    </>
  );
};

export default App;
