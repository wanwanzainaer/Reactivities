import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import { Header, List } from 'semantic-ui-react';

const App: React.FC = () => {
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    const activitiesRequest = async () => {
      const { data } = await axios.get('http://localhost:5000/api/activities');
      console.log(data);
      setActivities(data);
    };
    activitiesRequest();
  }, [activities.length]);
  return (
    <div>
      <Header as="h2" icon="users" content="Reactivities" />
      <List>
        {activities.map((activity: any) => (
          <List.Item key={activity.Id}>{activity.title}</List.Item>
        ))}
      </List>
    </div>
  );
};

export default App;
