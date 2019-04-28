import * as React from 'react';

import { Formik, Field, Form, FormikActions } from 'formik';
import { TextField } from 'formik-material-ui';
import { Button, InputLabel } from '@material-ui/core';
import Select from 'react-select';
import postNewPerson from '../utilities/postNewPerson';
import getRequestItems from '../utilities/getRequestItems';

export interface Person {
  name: string;
  bio: string;
  slug: string;
  requests: Array<number>;
}

const PersonForm: React.SFC<{}> = () => {
  const [requestOptions, setOptions] = React.useState();
  const [success, setSuccess] = React.useState('');
  const getOptions = async () => {
    const results = await getRequestItems();
    setOptions(results);
  };
  React.useEffect(() => {
    getOptions();
  }, []);

  return (
    <div className="container">
      <h1
        style={{
          textAlign: 'center',
        }}
      >
        Person Details
      </h1>
      <Formik
        initialValues={{
          name: '',
          bio: '',
          slug: '',
          requests: [],
        }}
        onSubmit={async (
          values: Person,
          { setSubmitting, resetForm }: FormikActions<Person>
        ) => {
          try {
            postNewPerson(values);
            setSuccess('success');
            resetForm();
          } catch {
            setSuccess('fail');
          }
        }}
        render={({ setFieldValue, isSubmitting, isValid }) => (
          <Form
            style={{
              display: 'flex',
              flexDirection: 'column',
              maxWidth: '400px',
              margin: '0 auto',
            }}
          >
            <InputLabel htmlFor="name">
              <strong>Name</strong>
            </InputLabel>
            <Field
              id="name"
              name="name"
              placeholder="John"
              type="text"
              component={TextField}
              required
            />

            <InputLabel
              htmlFor="bio"
              style={{
                marginTop: 20,
              }}
            >
              <strong>Bio</strong>
            </InputLabel>
            <Field
              id="bio"
              name="bio"
              placeholder="Plays Dodgeball"
              type="text"
              component={TextField}
              multiline
              required
            />

            <InputLabel
              htmlFor="slug"
              style={{
                marginTop: 20,
              }}
            >
              <strong>Nickname</strong>
            </InputLabel>
            <Field
              id="slug"
              name="slug"
              placeholder="JimmyJohn"
              type="text"
              component={TextField}
              required
            />

            <InputLabel
              htmlFor="requests"
              style={{
                marginTop: 20,
                marginBottom: 5,
              }}
            >
              <strong>Requests</strong>
            </InputLabel>
            <Field
              id="requests"
              name="requests"
              component={Select}
              isMulti
              closeMenuOnSelect={false}
              options={requestOptions}
              onChange={(value: Array<any>) =>
                setFieldValue('requests', value.map(v => ({ item: v.value })))
              }
              required
            />
            <Button
              type="submit"
              disabled={isSubmitting || !isValid}
              style={{
                marginTop: 20,
                display: 'inline-block',
              }}
            >
              Submit
            </Button>
          </Form>
        )}
      />
      {success &&
        (success === 'success' ? (
          <h3>Person added!</h3>
        ) : (
          <h3>Please try again</h3>
        ))}
    </div>
  );
};

export default PersonForm;
