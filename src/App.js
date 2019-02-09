import React, { Component } from 'react';
import styled from 'styled-components';
import TopNavigation from './components/TopNavigation';
import { Sticky } from 'semantic-ui-react';
import GuestRoute from './components/routes/GuestRoute';
import HomePage from './components/HomePage';
import { PropTypes } from 'prop-types';
import SignupPage from './components/SignupPage';
import UserRoute from './components/routes/UserRoute';
import DashboardPage from './components/DashboardPage';
import LoginPage from './components/LoginPage';
import { connect } from 'react-redux';
import jwt from 'jwt-decode'
import moment from 'moment';
import { userLoggedIn, userLoggedOut } from './actions/index';

const AppWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`

class App extends Component {

  state = {};
  handleContextRef = contextRef => this.setState({ contextRef });

  constructor(props) {
    super(props)
    let token = localStorage.pitsJWT;
    if(token) {
      let expirationDate = moment(jwt(token).exp*1000);
      if (moment().isBefore(expirationDate)) {       
        this.props.login(token);
      } 
    }
  }

  render() {
    const { contextRef } = this.state;
    const location = this.props.location;
    return (
      <AppWrapper ref={this.handleContextRef}>
        <Sticky context={contextRef} >
          <TopNavigation isAuthenticated={this.props.isAuthenticated} logout={this.props.logout}></TopNavigation>
        </Sticky>
        <GuestRoute location={location} path="/login" exact component={LoginPage} />
        <GuestRoute location={location} path="/signup" exact component={SignupPage} />
        <GuestRoute location={location} path="/" exact component={HomePage} />
        {/* <GuestRoute location={location} path="/confirmation/:token" exact component={ConfirmationPage} />
        <GuestRoute location={location} path="/login" exact component={LoginPage} />
        <GuestRoute location={location} path="/signup" exact component={SignupPage} />
        <GuestRoute location={location} path="/reset-password/:token" exact component={ResetPasswordPage} />
        <GuestRoute location={location} path="/forgot-password" exact component={ForgotPasswordPage} /> */}
        <UserRoute location={location} path="/dashboard" exact component={DashboardPage} />

      </AppWrapper>
    );
  }
}

App.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
  }).isRequired,
  isAuthenticated: PropTypes.bool.isRequired
}

function mapStateToProps(state) {
  return {
      isAuthenticated : state.user.auth
  }
}

const mapDispatchToProps = dispatch => {
  return {
    login: token => {
      dispatch(userLoggedIn(token))
    },
    logout: () => dispatch(userLoggedOut())
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(App);
