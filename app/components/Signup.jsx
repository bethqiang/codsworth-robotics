import React from 'react';
import { connect } from 'react-redux';

import { signup } from 'APP/app/reducers/auth';

export const Signup = ({ signup }) => (
  <form onSubmit={evt => {
    evt.preventDefault();
    signup(
      evt.target.firstName.value,
      evt.target.lastName.value,
      evt.target.username.value,
      evt.target.password.value
    );
  }}>
    <input name="firstName" />
    <input name="lastName" />
    <input name="username" />
    <input name="password" type="password" />
    <input type="submit" value="Register" />
  </form>
);

export default connect(
  state => ({}),
  { signup },
)(Signup);
