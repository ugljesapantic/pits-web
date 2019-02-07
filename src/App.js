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

const AppWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`

class App extends Component {

  state = {};
  handleContextRef = contextRef => this.setState({ contextRef });

  render() {
    const { contextRef } = this.state;
    const location = this.props.location;
    return (
      <AppWrapper ref={this.handleContextRef} className="App">
        <Sticky context={contextRef} >
          <TopNavigation isAuthenticated={false}></TopNavigation>
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
}


export default App;
