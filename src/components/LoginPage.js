import React, { Component } from 'react';
import { connect } from 'react-redux';
import { login } from '../actions';
import UsernamePasswordForm from './shared/UsernamePasswordForm';

class LoginPage extends Component {
  render() {
    return (
      <UsernamePasswordForm submit={this.props.submit} buttonTitle={'Login'} />
    );
  }
}

export default connect(
  null,
  { submit: login }
)(LoginPage);
