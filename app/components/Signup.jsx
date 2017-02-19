import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';

import { signup } from 'APP/app/reducers/auth';

const Signup = props => {
  return (
    <div className="container">
      <div className="account">
        <form onSubmit={props.signup}>
          <div>
            <input
              name="firstName"
              placeholder="First Name"
              className="form-control"
              required />
          </div>
          <div>
            <input
              name="lastName"
              placeholder="Last Name"
              className="form-control"
              required />
          </div>
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
          <button type="submit">Sign Up</button>
        </form>
        <p className="or-divider">or</p>
        <Link to="/signup">Log In</Link>
      </div>
    </div>
  );
};

/* ----------------- CONTAINER ------------------ */

const mapDispatchToProps = dispatch => {
  return {
    signup (evt) {
      evt.preventDefault();
      const firstName = evt.target.firstName.value;
      const lastName = evt.target.lastName.value;
      const email = evt.target.email.value;
      const password = evt.target.password.value;
      dispatch(signup(firstName, lastName, email, password));
    }
  };
};

export default connect(
  null,
  mapDispatchToProps
)(Signup);
