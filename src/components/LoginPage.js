import React from 'react';
import { connect } from 'react-redux';
import { login } from '../actions';
import UsernamePasswordForm from './shared/UsernamePasswordForm';

function LoginPage(props) {
  const { submit } = props;
  return <UsernamePasswordForm submit={submit} buttonTitle="Login" />;
}

export default connect(
  null,
  { submit: login }
)(LoginPage);
