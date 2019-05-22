import React from 'react';
import { connect } from 'react-redux';
import { signup } from '../actions';
import UsernamePasswordForm from './shared/UsernamePasswordForm';

function LoginPage({ submit }) {
  return <UsernamePasswordForm submit={submit} buttonTitle="Signup" />;
}

export default connect(
  null,
  { submit: signup }
)(LoginPage);
