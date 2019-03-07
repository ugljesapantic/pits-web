import React, { Component } from 'react';
import styled from 'styled-components';
import TopNavigation from './components/TopNavigation';
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
import { userLoggedIn, logout } from './actions';
import ClipboardPage from './components/clipboard/ClipboardPage';
import { main } from './styles/layout';
import ShoppingListPage from './components/shopping-list/ShoppingListPage';

const AppWrapper = styled.div`
  height: 100vh;
`

const ContentWrapper = styled.div`
  ${main};
  position: relative;
`

class App extends Component {

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
    const location = this.props.location;
    return (
      <AppWrapper ref={this.handleContextRef}>
        <TopNavigation history={this.props.history} isAuthenticated={this.props.isAuthenticated} logout={this.props.logout}></TopNavigation>
        <ContentWrapper className="ui container">
          <GuestRoute location={location} path="/login" exact component={LoginPage} />
          <GuestRoute location={location} path="/signup" exact component={SignupPage} />
          <GuestRoute location={location} path="/" exact component={HomePage} />
          {/* <GuestRoute location={location} path="/confirmation/:token" exact component={ConfirmationPage} />
          <GuestRoute location={location} path="/login" exact component={LoginPage} />
          <GuestRoute location={location} path="/signup" exact component={SignupPage} />
          <GuestRoute location={location} path="/reset-password/:token" exact component={ResetPasswordPage} />
          <GuestRoute location={location} path="/forgot-password" exact component={ForgotPasswordPage} /> */}
          <UserRoute location={location} path="/dashboard" exact component={DashboardPage} />
          <UserRoute location={location} path="/clipboard" exact component={ClipboardPage} />
          <UserRoute location={location} path="/shopping-list" exact component={ShoppingListPage} />
        </ContentWrapper>
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
    logout: () => dispatch(logout())
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(App);
