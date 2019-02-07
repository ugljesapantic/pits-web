import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, Form, Message } from "semantic-ui-react";
import Validator from "validator";
import styled from 'styled-components';
import { blackGradientBackground } from '../styles/styles';
import {connect} from 'react-redux';
import { login } from '../actions';

const FormWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    flex: 1;
    height: auto;
    ${props => !props.loading && blackGradientBackground };

    .sign-up-form {
        width: 300px;
        text-align: center;
    }
`

class LoginPage extends Component {
    state = {
        data : {
            'email': '',
            'password' : '',
        },
        loading : false,
        errors: {},
    };

    submit = (data) => this.props.signin(data).then(() => this.props.history.push('/dashboard'))

    onChange = e => this.setState({data : {...this.state.data, [e.target.name] : e.target.value}});

    onSubmit = () => {
        const errors = this.validate(this.state.data);
        this.setState({errors});
        if (Object.keys(errors).length === 0) {
            this.setState({loading: true})
            this.props.submit(this.state.data)
            .catch(error => this.setState({errors: {global: error}, loading: false}));
        }
    }

    validate = data => {
        const errors = {};
        if (!data.password) errors.password = "Can't be blank";
        if (!Validator.isEmail(data.email)) errors.email = "Invalid email"
        return errors;
    }

    render() {
        const {email, password} = this.state.data;
        const loading = this.state.loading;
        const errors = this.state.errors;
        
        return (
            <FormWrapper loading={loading}>
                {/* Todo, maybe make it a styled component instead of classname */}
                <Form className="sign-up-form" inverted onSubmit={this.onSubmit} loading={loading} noValidate>
                    { errors.global && 
                    <Message negative>
                        <Message.Header>Something went wrong</Message.Header>
                        <p>{errors.global}</p>
                    </Message>}
                    <Form.Field error={!!errors.email}>
                        <label htmlFor="email">Email</label>
                        <input
                        type="email"
                        id="email"
                        name="email"
                        placeholder="email@example.com"
                        value={email}
                        onChange={this.onChange} />
                    </Form.Field>
                    {errors.email && <Message negative>{errors.email}</Message>}
                    <Form.Field error={!!errors.password}>
                        <label htmlFor="password">Password</label>
                        <input
                        type="password"
                        id="password"
                        name="password"
                        placeholder=""
                        value={password}
                        onChange={this.onChange} />
                    </Form.Field>
                    {errors.password && <Message negative>{errors.password}</Message>}
                    <Button primary>Login</Button>
                </Form>
            </FormWrapper>
        );
    }
}

LoginPage.propTypes = {
    history: PropTypes.shape({
        push: PropTypes.func,
    }).isRequired,
    submit: PropTypes.func.isRequired,
}

export default connect(null, {submit: login})(LoginPage);