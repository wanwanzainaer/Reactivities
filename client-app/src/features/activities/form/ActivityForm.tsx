import { observer } from 'mobx-react-lite';
import React, { useState, FC, ChangeEvent, useEffect } from 'react';
import { useHistory, useParams } from 'react-router';
import { Button, Form, Segment } from 'semantic-ui-react';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import { Activity } from '../../../app/models/activity';
import { useStore } from '../../../app/stores/store';
import { v4 as uuid } from 'uuid';
import { Link } from 'react-router-dom';
import { Formik } from 'formik';
const ActivityForm: FC = () => {
  const history = useHistory();
  const {
    activityStore: {
      updateActivity,
      createActivity,
      loadActivity,
      loadingInitial,
      loading,
    },
  } = useStore();
  const { id } = useParams<{ id: string }>();
  const [activity, setActivity] = useState<Activity>({
    id: '',
    title: '',
    category: '',
    description: '',
    date: '',
    city: '',
    venue: '',
  });

  useEffect(() => {
    const load = async (id: string) => {
      const activity = await loadActivity(id);
      setActivity(activity!);
    };
    if (id) load(id);
  }, [id, loadActivity]);

  // const handleSubmit = async () => {
  //   if (activity.id.length === 0) {
  //     let newActivity = {
  //       ...activity,
  //       id: uuid(),
  //     };
  //     await createActivity(newActivity);
  //     history.push(`/activities/${newActivity.id}`);
  //   } else {
  //     await updateActivity(activity);
  //     history.push(`/activities/${activity.id}`);
  //   }
  // };

  // const handleInputChange = (
  //   event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  // ) => {
  //   const { name, value } = event.target;
  //   setActivity((state) => ({ ...state, [name]: value }));
  // };

  if (loadingInitial)
    return <LoadingComponent content="Loading activity...." />;

  return (
    <Segment clearing>
      <Formik
        initialValues={activity}
        onSubmit={(values) => console.log(values)}
      >
        {({ values: activity, handleChange, handleSubmit }) => (
          <Form onSubmit={handleSubmit} autoComplete="off">
            <Form.Input
              placeholder="Title"
              value={activity.title}
              name="title"
              onChange={handleChange}
            />
            <Form.TextArea
              placeholder="Description"
              value={activity.description}
              name="description"
              onChange={handleChange}
            />
            <Form.Input
              placeholder="Category"
              value={activity.category}
              name="category"
              onChange={handleChange}
            />
            <Form.Input
              type="date"
              placeholder="Date"
              value={activity.date}
              name="date"
              onChange={handleChange}
            />
            <Form.Input
              placeholder="City"
              value={activity.city}
              name="city"
              onChange={handleChange}
            />
            <Form.Input
              placeholder="Venue"
              value={activity.venue}
              name="venue"
              onChange={handleChange}
            />
            <Button
              loading={loading}
              floated="right"
              positive
              type="submit"
              content="Submit"
            />
            <Button
              as={Link}
              to="/activities"
              floated="right"
              type="button"
              content="Cancel"
            />
          </Form>
        )}
      </Formik>
    </Segment>
  );
};

export default observer(ActivityForm);
