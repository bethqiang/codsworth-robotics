import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';

import { login } from 'APP/app/reducers/auth';

export const Login = props => {
  return (
    <div className="container">
      <div className="account">
        <form onSubmit={props.login}>
          <div>
            <input
              name="email"
              type="email"
              placeholder="Email"
              className="form-control"
              required />
          </div>
          <div>
            <input
              name="password"
              type="password"
              placeholder="Password"
              className="form-control"
              required />
          </div>
          <button type="submit">Log In</button>
        </form>
        <p className="or-divider">or</p>
        <Link to="/signup">Sign Up</Link>
      </div>
    </div>
  );
};

/* ----------------- CONTAINER ------------------ */

export const mapDispatchToProps = dispatch => {
  return {
    login (evt) {
      evt.preventDefault();
      const email = evt.target.email.value;
      const password = evt.target.password.value;
      dispatch(login(email, password));
    }
  };
};

export default connect(
  null,
  mapDispatchToProps
)(Login);
