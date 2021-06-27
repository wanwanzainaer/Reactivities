import { observer } from 'mobx-react-lite';
import React, { FC, useEffect } from 'react';
import { Grid } from 'semantic-ui-react';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import { useStore } from '../../../app/stores/store';

import ActivityList from './ActivityList';

const ActivityDashboard: FC = () => {
  const {
    activityStore: { loadingInitial, loadActivities },
  } = useStore();

  useEffect(() => {
    loadActivities();
  }, [loadActivities]);
  if (loadingInitial) return <LoadingComponent content="Loading App" />;

  return (
    <Grid>
      <Grid.Column width="10">
        <ActivityList />
      </Grid.Column>
      <Grid.Column width="6">
        <h2>Activity filters</h2>
      </Grid.Column>
    </Grid>
  );
};

export default observer(ActivityDashboard);
