import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

const UserRoute = ({ component: Component, isAuthenticated, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      isAuthenticated ? <Component {...props} /> : <Redirect to="/login" />
    }
  />
);

function mapStateToProps(state) {
  return {
    isAuthenticated: state.user.auth
  };
}

export default connect(mapStateToProps)(UserRoute);
