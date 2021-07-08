import { observer } from 'mobx-react-lite';
import React, { useState, FC, ChangeEvent, useEffect } from 'react';
import { useHistory, useParams } from 'react-router';
import { Button, FormField, Label, Segment } from 'semantic-ui-react';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import { Activity } from '../../../app/models/activity';
import { useStore } from '../../../app/stores/store';
import { v4 as uuid } from 'uuid';
import { Link } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import MyTextInput from '../../../app/common/form/MyTextInput';
import MyTextArea from '../../../app/common/form/MyTextArea';
import MySelectInput from '../../../app/common/form/MySelectInput';
import { categoryOptions } from '../../../app/common/options/categoryOptions';
import MyDateInput from '../../../app/common/form/MyDateInput';
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

  const validationSchema = Yup.object({
    title: Yup.string().required('The activity title is required'),
    description: Yup.string().required('The activity description is required'),
    category: Yup.string().required(),
    date: Yup.string().required(),
    venue: Yup.string().required(),
    city: Yup.string().required(),
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
        enableReinitialize
        initialValues={activity}
        validationSchema={validationSchema}
        onSubmit={(values) => console.log(values)}
      >
        {({ values: activity, handleChange, handleSubmit }) => (
          <Form className="ui form" onSubmit={handleSubmit} autoComplete="off">
            {/* <FormField>(Field from formik)
              <Field placeholder="Title" name="title" />
              <ErrorMessage
                name="title"
                render={(error) => <Label basic color="red" content={error} />}
              />
            </FormField> */}
            <MyTextInput name="title" placeholder="Title" />
            <MyTextArea placeholder="Description" name="description" rows={3} />
            <MySelectInput
              options={categoryOptions}
              placeholder="Category"
              name="category"
            />
            <MyDateInput
              placeholderText="Date"
              name="date"
              showTimeSelect
              timeCaption="time"
              dateFormat="MMMM d, yyyy h:mm aa"
            />
            <MyTextInput placeholder="City" name="city" />
            <MyTextInput placeholder="Venue" name="venue" />
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
