import * as React from 'react';
import axios from 'axios';

import { Formik, Field, Form, FormikActions } from 'formik';
import { TextField } from 'formik-material-ui';
import { InputLabel, Button } from '@material-ui/core';


interface LoginInfo {
  identifier: string;
  password: string;
}

const Login: React.SFC<{}> = () => {
  return (
    <div className="loginForm">
      
      <Formik
        initialValues={{
          identifier: '',
          password: '',
        }}
        onSubmit={async (
          values: LoginInfo,
          { setSubmitting }: FormikActions<LoginInfo>
        ) => {
          console.log(values);
          await axios
            .post('http://localhost:8080/api/auth/login', values)
            .then(response => {
              window.localStorage.setItem(
                'token',
                response.data.response.token
              );
            });
        }}
        render={({ isSubmitting, isValid }) => (
          <Form
            style={{
              display: 'flex',
              flexDirection: 'column',
              maxWidth: 400,
              margin: '0 auto',
            }}
          > 
            <h1
            style={{
            margin:'0 auto'
            }}
            >Login</h1>
            <InputLabel htmlFor="identifier"><strong>Username</strong></InputLabel>
            <Field
              style={{
              marginBottom:20
              }}
              id="identifier"
              name="identifier"
              placeholder="example@website.com"
              type="text"
              component={TextField}
              required
            />
            <InputLabel htmlFor="password"><strong>Password</strong></InputLabel>
            <Field
              id="password"
              name="password"
              placeholder="password"
              type="password"
              component={TextField}
              required
            />
            <Button
              type="submit"
              disabled={isSubmitting || !isValid}
              style={{
              display: 'block', 
              marginTop:20
              }}
            >
              Login
            </Button>
          </Form>
        )}
      />
    </div>
  );
};

export default Login;

// post user deets /api/auth/login
// body: identifier (username or email), password: text
// response: user object, token

// window.localstorage.token

// create: post /api/users/
// body: username, password, email, name
