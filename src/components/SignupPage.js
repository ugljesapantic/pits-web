import React, { Component } from 'react';
import { connect } from 'react-redux';
import { signup } from '../actions';
import UsernamePasswordForm from './shared/UsernamePasswordForm';

class LoginPage extends Component {
  render() {
    return (
      <UsernamePasswordForm submit={this.props.submit} buttonTitle={'Signup'} />
    );
  }
}

export default connect(
  null,
  { submit: signup }
)(LoginPage);
