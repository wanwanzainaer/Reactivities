import { observer } from 'mobx-react-lite';
import React, { FC, useEffect } from 'react';
import { useParams } from 'react-router';
import { Grid } from 'semantic-ui-react';
import { useStore } from '../../../app/stores/store';
import ActivityDetailedChat from './ActivityDetailedChat';
import ActivityDetailedHeader from './ActivityDetailedHeader';
import ActivityDetailedInfo from './ActivityDetailedInfo';
import ActivityDetailedSidebar from './ActivityDetailedSidebar';

const ActivityDetails: FC = () => {
  const {
    activityStore: { selectedActivity: activity, loadActivity, loadingInitial },
  } = useStore();

  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    if (id) loadActivity(id);
  }, [id, loadActivity]);
  if (loadingInitial || !activity) return <></>;

  return (
    <Grid>
      <Grid.Column width={10}>
        <ActivityDetailedHeader activity={activity} />
        <ActivityDetailedInfo activity={activity} />
        <ActivityDetailedChat />
      </Grid.Column>
      <Grid.Column width={6}>
        <ActivityDetailedSidebar />
      </Grid.Column>
    </Grid>
  );
};
export default observer(ActivityDetails);
