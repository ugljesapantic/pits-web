import React, { Component } from 'react';
import Validator from 'validator';
import styled from 'styled-components';
import Message from './Message';
import Button from './Button';
import FormInput from './FormInput';
import { fullScreen } from '../../styles/layout';

export const Form = styled.form`
  input {
    margin-top: 1rem;
  }

  button {
    margin-top: 1rem;
  }

  ${props =>
    props.loading &&
    `
        pointer-events: none;
        opacity: 0.5;
    `}
`;

export const FormWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex: 1;
  ${fullScreen};

  form {
    width: 20rem;
    text-align: center;
  }
`;

class UsernamePasswordForm extends Component {
  state = {
    data: {
      email: '',
      password: ''
    },
    loading: false,
    errors: {}
  };

  onChange = e => {
    e.persist();
    this.setState(prevState => ({
      data: { ...prevState.data, [e.target.name]: e.target.value }
    }));
  };

  onSubmit = e => {
    e.preventDefault();
    const { data } = this.state;
    const { submit } = this.props;

    const errors = this.validate(data);
    this.setState({ errors });
    if (Object.keys(errors).length === 0) {
      this.setState({ loading: true });
      submit(data).catch(res =>
        this.setState({
          errors: { global: res.response.data },
          loading: false
        })
      );
    }
  };

  validate = data => {
    const errors = {};
    if (!data.password) errors.password = "Can't be blank";
    if (!Validator.isEmail(data.email)) errors.email = 'Invalid email';
    return errors;
  };

  render() {
    const { data } = this.state;
    const { email, password } = data;
    const { loading } = this.state;
    const { errors } = this.state;
    const { buttonTitle } = this.props;

    return (
      <FormWrapper>
        <Form onSubmit={this.onSubmit} loading={loading} noValidate>
          {errors.global && <Message negative>{errors.global}</Message>}

          <FormInput
            error={!!errors.email}
            type="email"
            id="email"
            name="email"
            placeholder="email@example.com"
            value={email}
            onChange={this.onChange}
          />

          <FormInput
            error={!!errors.password}
            type="password"
            id="password"
            name="password"
            placeholder="password"
            value={password}
            onChange={this.onChange}
          />
          <Button primary>{buttonTitle}</Button>
        </Form>
      </FormWrapper>
    );
  }
}

export default UsernamePasswordForm;
